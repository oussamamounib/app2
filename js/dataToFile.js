document.querySelector("#download-btn").addEventListener("click", downloadXLS);

function downloadXLS() {
  // Select the table element
  var table = document.getElementById('tblCustomers');

  // Remove the profile picture column from the table
  var rows = table.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    rows[i].deleteCell(3); // Assuming the profile picture is the 4th column (index 3)
  }

  // Convert the table to a workbook object
  var workbook = XLSX.utils.table_to_book(table);

  // Download the workbook as an XLSX file
  XLSX.writeFile(workbook, 'Table.xlsx');
}
  

var downloadBtn = document.getElementById("download-btn2");

downloadBtn.addEventListener("click", function(){
  var data = localStorage.getItem("userData");
  var jsonData = JSON.parse(data);
  var csvData = ConvertToCSV(jsonData);

  // Create a new Blob object with the CSV data
  var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  // Create a link element and download the file
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "userData.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

function ConvertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var header = '';
  for (var index in array[0]) {
    header += index + ',';
  }
  header = header.slice(0, -1);
  str += header + '\r\n';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}

//pdf
function Export() {
  // Select the table element
  var table = document.getElementById('tblCustomers');

  // Remove the last column from the table
  var rows = table.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    rows[i].deleteCell(-1);
  }

  // Render the modified table with html2canvas
  html2canvas(table, {
    onrendered: function(canvas) {
      var data = canvas.toDataURL();

      // Define the document definition for pdfMake
      var docDefinition = {
        content: [{
          image: data,
          width: 500
        }]
      };

      // Create and download the PDF
      pdfMake.createPdf(docDefinition).download("Table.pdf");
    }
  });
}
