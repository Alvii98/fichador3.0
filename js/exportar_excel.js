function exportarExcel(){
    try {
        let tabla = ''
        for (let i = 0; i < document.querySelectorAll('table').length; i++) {
            if (document.querySelectorAll('table')[i].style.display == 'none') continue
            tabla = document.querySelectorAll('table')[i]
        }
        let th,
        tr = tabla.childNodes[3].getElementsByTagName("tr"),
        data = [],titles = [], row = []

        try {
            th = tabla.childNodes[1].childNodes[3].getElementsByTagName("th")
        } catch (error) {
            th = tabla.childNodes[1].childNodes[1].getElementsByTagName("th")
        }

        for (let i = 0; i < th.length; i++) {
            if (th[i].innerText.toUpperCase() == 'ELIMINAR') continue
            titles.push(th[i].innerText.toUpperCase());
        }
        data.push(titles)
        for (let e = 0; e < tr.length; e++) {
            if(tr[e].style.display == "none") continue
            row = []
            for (let d = 0; d < tr[e].getElementsByTagName("td").length; d++) {
                row.push(tr[e].getElementsByTagName("td")[d].innerText)
            }
            data.push(row)
        }

        // (C2) CREATE NEW EXCEL "FILE"
        let workbook = XLSX.utils.book_new(),
        worksheet = XLSX.utils.aoa_to_sheet(data);
        workbook.SheetNames.push("First");
        workbook.Sheets["First"] = worksheet;
    
        // (C3) TO BINARY STRING
        let xlsbin = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary"
        });
    
        // (C4) TO BLOB OBJECT
        let buffer = new ArrayBuffer(xlsbin.length),
            array = new Uint8Array(buffer);
        for (let i = 0; i < xlsbin.length; i++) {
        array[i] = xlsbin.charCodeAt(i) & 0XFF;
        }
        let xlsblob = new Blob([buffer], {type:"application/octet-stream"});
    
        // (C5) "FORCE DOWNLOAD"
        let url = window.URL.createObjectURL(xlsblob),
        anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "datos_"+tabla.id+".xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error)
        alert('No se encontro tabla.')
    }
}
