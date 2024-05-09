//const file = document.querySelector("#formFile");

//for CSV and Excel files
// For CSV files using PapaParse
document.getElementById('submitB').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (!file) {          //start of if statement for when the user submited without selecting anyfile
    alert('Please select a file before clicking the button.'); /// this alert should be displayed when they don't select any file
    
  }
  
  const reader = new FileReader(); //create a file
  
  reader.onload = function(event) {
    const content = event.target.result;
    const fileExtension = file.name.split('.').pop().toLowerCase(); //we are separating content
    
    if (fileExtension === 'csv') {
      parseCSV(content);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      parseExcel(content);
    } else {
      alert('Unsupported file format. Load a file with .csv/.xls/.xlsx as the file extention');
    }
  };
  
  reader.readAsBinaryString(file);
});

function parseCSV(content) {
  Papa.parse(content, {
    header: true,
    complete: function(results) {
      displayTable(results.data); //displaying the content of CSV file
    }
  });
}
    
function parseExcel(content) {      ///displaying the content of the Excel file
  const readContent = XLSX.read(content, { type: 'binary' });  
  const sheetName = readContent.SheetNames[0];
  const sheet = readContent.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  displayTable(data);
}

//for creating table elements that will be displayed oin mt table Area..
function displayTable(data) {
  const tableArea = document.getElementById('tableArea');
  tableArea.innerHTML = '';
  
  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered');
  
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  
  const headers = Object.keys(data[0]);
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  
  data.forEach(rowData => {
    const row = document.createElement('tr');
    headers.forEach(header => {
      const cell = document.createElement('td');
      cell.textContent = rowData[header];
      row.appendChild(cell);
    });
    tbody.appendChild(row);
    
  });
  
  table.appendChild(thead);
  table.appendChild(tbody);
  tableArea.appendChild(table);
}