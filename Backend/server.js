const express = require('express');
const fs = require('fs');
const app = express();

// Store the history of operations
let history = [];

// Load history from file if available
if (fs.existsSync('history.json')) {
  const historyData = fs.readFileSync('history.json', 'utf8');
  history = JSON.parse(historyData);
}

// Mapping of operation names to symbols
const operationSymbols = {
  plus: '+',
  minus: '-',
  into: '*',
  times: '*',
  over: '/',
  divide: '/',
  power: '**',
  exponent: '**',
  mod: '%',
  modulus: '%',
};

// Middleware to parse URL parameters
app.use(express.urlencoded({ extended: true }));

// Handler for the root URL
app.get('/', (req, res) => {
  const samples = [
    '/',
    '/history',
    '/5/plus/3',
    '/3/minus/5',
    '/3/minus/5/plus/8',
    '/3/into/5/plus/8/into/6',
    '/negate/5',
    '/5/plus/3/minus/2',
    '/10/into/2/over/5/mod/3',
    '/7/plus/4/minus/2/times/3',
    '/8/power/2/plus/6/minus/2/into/3',
    '/20/plus/5/into/2/divide/10',
    '/100/minus/25/plus/50/into/2',
    '/10/mod/3/into/5/plus/8',
    '/2/power/3/plus/5/times/4/minus/7',
    '/9/into/3/divide/2/plus/4/times/6',
    '/7/minus/3/into/2/plus/5/power/2',
    '/negate/10/',
    '/5/power/2/times/6/plus/4',
    '/5/into/2/negate',
    '/8/over/4/negate',
  ];

  const htmlList = samples.map(sample => `<li><a href="${sample}">${sample}</a></li>`).join('');

  const htmlResponse = `
    <html>
    <head>
        <title>Sample URLs</title>
    </head>
    <body>
        <h1>Sample URLs</h1>
        <ul>
            ${htmlList}
        </ul>
    </body>
    </html>
  `;

  res.send(htmlResponse);
});

// Generate HTML for the history page
function generateHistoryHTML() {
  const historyList = history.map(entry => `<li>${entry.question}: ${entry.answer}</li>`).join('');
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>History</title>
  </head>
  <body>
    <h1>History</h1>
    <ol>
      ${historyList}
    </ol>
  </body>
  </html>
  `;
}

// Helper function to perform a single operation
function performOperation(num1, operator, num2) {
  switch (operator) {
    case 'plus':
    case 'minus':
    case 'into':
    case 'times':
    case 'over':
    case 'divide':
    case 'power':
    case 'exponent':
    case 'mod':
    case 'modulus':
      return eval(`${num1} ${operationSymbols[operator]} ${num2}`);
    case 'negate':
      return -num1;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}

// Recursive function to process multiple operations
function evaluateOperations(nums, operators) {
  if (operators.length === 0) {
    return nums[0];
  }

  const num1 = nums.shift();
  const operator = operators.shift();
  const num2 = nums.shift();

  const result = performOperation(num1, operator, num2);
  nums.unshift(result);

  return evaluateOperations(nums, operators);
}

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Endpoint for the /history URL
app.get('/history', (req, res) => {
  res.send(generateHistoryHTML());
});

// Endpoint for performing operations
app.get('*', (req, res) => {
  const segments = req.path.split('/').filter(segment => segment !== '');

  if (segments.length === 1 && segments[0] === 'history') {
    res.send(generateHistoryHTML());
  } else {
    const nums = [];
    const operators = [];

    if (segments[0] === 'negate') {
      nums.push(parseFloat(segments[1]));
      operators.push('negate');
    } else {
      for (let i = 0; i < segments.length; i += 2) {
        nums.push(parseFloat(segments[i]));
      }
      for (let i = 1; i < segments.length; i += 2) {
        operators.push(segments[i].toLowerCase());
      }
    }

    try {
      const result = evaluateOperations(nums, operators);
      const question = segments.map((segment, index) => {
        if (index % 2 === 0) {
          return segment;
        } else {
          return operationSymbols[segment.toLowerCase()];
        }
      }).join(' ');

      history.push({ question, answer: result });
      if (history.length > 20) {
        history.shift();
      }

      fs.writeFileSync('history.json', JSON.stringify(history), 'utf8');

      res.json({ question, answer: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
});

// Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
