import express from 'express';
import cors from 'cors';
import { claude } from '@instantlyeasy/claude-code-sdk-ts';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to handle Claude requests
app.post('/api/claude', async (req, res) => {
  try {
    const { prompt, model = 'sonnet' } = req.body;
    
    const response = await claude()
      .withModel(model)
      .skipPermissions()
      .query(prompt)
      .asText();
    
    res.json({ success: true, response });
  } catch (error) {
    console.error('Claude error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Specific endpoints for document operations
app.post('/api/claude/analyze-document', async (req, res) => {
  try {
    const { documentContent, documentType } = req.body;
    
    const prompt = `
      Analyze this document content and provide professional design and content suggestions.
      Document Type: ${documentType}
      Document Content Structure: ${documentContent}

      Please provide:
      1. Design suggestions (3-5 specific improvements)
      2. Content suggestions (3-5 specific improvements)
      3. Layout score (0-100)
      4. Readability score (0-100)
      5. Overall feedback (2-3 sentences)

      Format your response as JSON matching this structure:
      {
        "designSuggestions": ["suggestion1", "suggestion2"],
        "contentSuggestions": ["suggestion1", "suggestion2"],
        "layoutScore": 85,
        "readabilityScore": 90,
        "overallFeedback": "Overall feedback here"
      }
    `;
    
    const response = await claude()
      .withModel('sonnet')
      .skipPermissions()
      .query(prompt)
      .asText();
    
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      res.json({ success: true, analysis: JSON.parse(jsonMatch[0]) });
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.post('/api/claude/improve-page', async (req, res) => {
  try {
    const { pageContent, documentType, pageNumber, instructions } = req.body;
    
    const prompt = `
      You are a professional UI/UX designer improving the content inside a document page.
      
      Current page ${pageNumber} content (this is the content INSIDE a <Page> component):
      \`\`\`tsx
      ${pageContent}
      \`\`\`

      IMPORTANT INSTRUCTIONS:
      ${instructions ? `
      User instructions: ${instructions}
      
      ONLY follow the user's instructions above. Do NOT make any other changes.
      ` : `
      Since no specific instructions were provided, improve the overall design by:
      - Enhancing visual hierarchy and readability
      - Improving spacing and alignment
      - Ensuring professional and modern design
      `}

      CRITICAL REQUIREMENTS:
      1. Use ONLY standard HTML elements (div, h1, h2, p, span, img, etc.)
      2. STYLE SYNTAX: Always use style={{ property: 'value' }} with DOUBLE curly braces
      3. Do NOT use any imported components or external dependencies
      4. Do NOT reference any variables like 'styles' or imported objects
      5. Keep all text content exactly the same
      6. Do NOT add a <Page> wrapper - return only the inner content
      
      Return ONLY the improved inner content without any explanation, markdown code blocks, or Page wrapper.
    `;
    
    let improvedCode = await claude()
      .withModel('sonnet')
      .skipPermissions()
      .query(prompt)
      .asText();
    
    // Clean up response
    improvedCode = improvedCode.replace(/^```[\w]*\n/gm, '');
    improvedCode = improvedCode.replace(/\n```$/gm, '');
    
    res.json({ success: true, improvedCode });
  } catch (error) {
    console.error('Page improvement error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Claude service running on port ${PORT}`);
});