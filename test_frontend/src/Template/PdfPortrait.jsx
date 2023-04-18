import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function generatePDF(
  filas,
  columnas,
  titulo,
  subTitulo,
  nombrePdf,
  styleColumn,
  UserAut
) {
  var doc = new jsPDF('p', 'pt', 'letter').setProperties({title: nombrePdf}),
    totalPagesExp = '{total_pages_count_string}',
    pageSize = doc.internal.pageSize,
    pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight(),
    str = null,
    hoy = new Date()

  function pageContent(data) {
    doc.text(titulo, 300, 50, {width: 800, align: 'center'})
    doc.text(subTitulo, 300, 70.8661, {width: 800, align: 'center'})
    doc
      .setFontSize(10)
      .text(
        `${'Fecha'}: ${('00' + hoy.getDate()).slice(-2)}/${('00' + (hoy.getMonth() + 1)).slice(
          -2
        )}/${hoy.getFullYear()}`,
        450,
        100,
        {width: 800, align: 'left'}
      )
    doc
      .setFontSize(10)
      .text(`${'Impreso por'}: Lilibeth`, 300, 100, {width: 800, align: 'center'})

    // Footer
    str = 'Pagina ' + doc.internal.getNumberOfPages()
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      str = str + ' de ' + totalPagesExp
    }
    

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    doc.text(str, data.settings.margin.left, pageHeight - 20)
  }

  doc.autoTable({
    head: columnas,
    body: filas,
    tableWidth: 'auto',
    columnStyles: {
      cellWidth: 'auto',
      ...styleColumn,
    },
    headStyles: {
      fillColor: [0, 105, 217],
      textColor: [255],
      valign: 'middle',
      halign: 'center',
    },
    styles: {
      fontSize: 10,
      fillColor: [233, 233, 240],
      lineWidth: 0,
      lineColor: 48,
      textColor: 20,
      pageBreak: 'auto',
    },
    didDrawPage: pageContent,
    margin: {
      left: 70.8661,
      right: 70.8661,
      top: 110,
      bottom: 50,
    },
  })
  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp)
  }
  return doc.output('datauristring')
  // doc.save(`${nombrePdf}.pdf`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {generatePDF}
