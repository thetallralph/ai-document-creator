/**
 * Example of how to integrate with an LLM API
 * Replace this with your actual LLM service integration
 */

interface LLMResponse {
  code: string;
  error?: string;
}

/**
 * Call your LLM API to generate template code
 * 
 * @param prompt The formatted prompt for the LLM
 * @returns The generated TSX code
 */
export async function generateTemplateWithLLM(_prompt: string): Promise<LLMResponse> {
  // Example integration with OpenAI API
  // Replace with your actual implementation
  
  try {
    // const response = await fetch('https://api.openai.com/v1/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${YOUR_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     prompt: prompt,
    //     max_tokens: 2000,
    //     temperature: 0.7
    //   })
    // });
    
    // const data = await response.json();
    // return { code: data.choices[0].text };
    
    // For demo purposes, return a sample template
    return {
      code: `const Template = () => {
  return (
    <Document title="Sample Invoice" type="flyer" paperSize="A4">
      <Page background="#ffffff" padding="40px">
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, color: '#333', marginBottom: 10 }}>
            INVOICE
          </h1>
          <p style={{ fontSize: 14, color: '#666' }}>
            Invoice #: INV-001<br />
            Date: ${new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ fontSize: 18, marginBottom: 10 }}>Bill To:</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>
            Customer Name<br />
            123 Main Street<br />
            City, State 12345
          </p>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Description</th>
              <th style={{ padding: 10, textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>Service Item 1</td>
              <td style={{ padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' }}>$100.00</td>
            </tr>
            <tr>
              <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>Service Item 2</td>
              <td style={{ padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' }}>$200.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style={{ padding: 10, fontWeight: 'bold' }}>Total</td>
              <td style={{ padding: 10, textAlign: 'right', fontWeight: 'bold' }}>$300.00</td>
            </tr>
          </tfoot>
        </table>
      </Page>
    </Document>
  );
};`
    };
  } catch (error) {
    return {
      code: '',
      error: 'Failed to generate template: ' + (error as Error).message
    };
  }
}

/**
 * Generate a prompt for creating templates
 * This helps ensure consistent output from the LLM
 */
export function createTemplatePrompt(description: string): string {
  return `Create a React component for a document template with the following requirements:

${description}

Important guidelines:
1. Use ONLY these imports (they are already available, do not import them):
   - React
   - Document component with props: title, type ("flyer" | "booklet" | "presentation"), paperSize
   - Page component with props: background, padding

2. The component must be named "Template" (not exported)

3. Use this exact structure:
\`\`\`tsx
const Template = () => {
  return (
    <Document title="..." type="..." paperSize="...">
      <Page background="..." padding="...">
        {/* Your content here using only HTML elements and inline styles */}
      </Page>
    </Document>
  );
};
\`\`\`

4. Style guidelines:
   - Use only inline styles as React style objects
   - Use camelCase for style properties (fontSize, not font-size)
   - Numeric values don't need 'px' suffix
   - Colors can be hex, rgb, or named colors
   - Gradients are supported: "linear-gradient(...)"

5. Available paper sizes: A3, A4, A5, Letter, Legal, Tabloid

6. Example of proper style usage:
   style={{ fontSize: 24, color: '#333', marginBottom: 20 }}

Now create the template component based on the requirements above.`;
}