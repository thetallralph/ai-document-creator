// Test script to check page extraction
const { extractAllPages } = require('./src/utils/pageExtractor.ts');

// Sample of the Cactuce booklet code
const testCode = `
export const CactuceBooklet = () => {
  return (
    <Document title="Test" type="booklet" paperSize="A5">
      <Page background="#fff">Page 1</Page>
      <Page background="#000">Page 2</Page>
      <Page background={colors.green}>Page 3</Page>
      <Page background={\`linear-gradient(135deg, \${colors.green} 0%, \${colors.darkGreen} 100%)\`}>
        Complex content
      </Page>
    </Document>
  );
};`;

try {
  const pages = extractAllPages(testCode);
  console.log('Found', pages.length, 'pages');
  pages.forEach((page, index) => {
    console.log(`Page ${index + 1}:`, page.openTag);
  });
} catch (error) {
  console.error('Error:', error);
}