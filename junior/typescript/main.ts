import * as fs from 'fs';

interface TestCase {
  panelW: number;
  panelH: number;
  roofW: number;
  roofH: number;
  expected: number;
}

interface TestData {
  testCases: TestCase[];
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  
  //panelWidth/roofWidth, panelHeight/roofHeight
  //capturar restos, ver si se puede poner otro panel en horizontal o vertical
  //panelWidth/roofHeight, panelHeight/roofWidth
  
  console.log("▓▓▓▓ Calculating panels... ▓▓▓▓");
  // Implementa acá tu solución
    const panelOrientation=[
    { 
      width: panelWidth, 
      height: panelHeight
    },
    { 
      width: panelHeight, 
      height: panelWidth
    }
  ];
  const totalPanels=panelOrientation.map((orientation) => {
    const panelsTentative = Math.floor(roofWidth / orientation.width) * Math.floor(roofHeight / orientation.height);

    const remainingWidth = roofWidth % orientation.width;
    const remainingHeight = roofHeight % orientation.height;

    const rotatedWidth = orientation.height;
    const rotatedHeight = orientation.width;

    const extraX = remainingWidth >= rotatedWidth ? Math.floor(roofHeight / rotatedHeight) : 0;
    const extraY = remainingHeight >= rotatedHeight ? Math.floor(roofWidth / rotatedWidth) : 0;

    return panelsTentative + Math.max(extraX, extraY);
  });
  return totalPanels.reduce((acc,currentValue) => Math.max(acc,currentValue),0);
}
function main(): void {
  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("================================\n");
  
  runTests();
}

function runTests(): void {
  const data: TestData = JSON.parse(fs.readFileSync('test_cases.json', 'utf-8'));
  const testCases = data.testCases;
  
  console.log("Corriendo tests:");
  console.log("-------------------");
  
  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(test.panelW, test.panelH, test.roofW, test.roofH);
    const passed = result === test.expected;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`);
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

main();
