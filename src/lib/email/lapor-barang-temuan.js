export const userMailHTML =
  (namaBarang, jenisBarang, lokasiTemuanBarang, warnaBarang, foundDate, fotoBarang, helperPhoneNumber, user) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Notification</title>
      <meta name="description" content="Notification">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <link rel="stylesheet" href="css/styles.css?v=1.0">
    </head>
    
    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
            </div>
            <div class="container" style="margin-left: 20px;margin-right: 20px;">
            <h3>👋🏼 Halo ${user.displayName}, terima kasih atas kerja sama anda!</h3>
            <div style="font-size: 16px;">
            <p>
            Rincian Barang Temuan: <br />
            Nama Barang: ${namaBarang} <br />
            Jenis Barang: ${jenisBarang} <br />
            Lokasi Temuan Barang: ${lokasiTemuanBarang} <br />
            Warna Barang: ${warnaBarang} <br />
            Tanggal Temuan Barang: ${foundDate} <br />
            Foto Barang: ${fotoBarang} <br />
            Nomor Telepon Pelapor: ${helperPhoneNumber} <br />
            Email Pelapor: ${user.email} <br />
            Nama Pelapor: ${user.displayName} <br />
            </p>
            <p>
            Informasi penyerahan barang:
            Anda dapat menyerahkan barang temuan ke meja Customer Service atau pihak Aviation Security (AvSec).
            <br />
            Jika diperlukan, barang dapat kami ambil di tempat anda.
            <br />
            Kami akan menghubungi anda melalui email atau nomor telepon anda segera setelah kami menerima dan meninjau laporan anda dari formulir temuan barang.
            <br />
            Terima kasih!
            </p>
            <br />
            </div>
            <a href="http://localhost:3000/"><img src="https://firebasestorage.googleapis.com/v0/b/lost-found-yia.appspot.com/o/foundItemsImage%2FMpuklX20190503080722.png?alt=media&token=968b82a1-248a-4c0e-8659-8e0b39813d97" class="logo-image" style="height: 50px;width: 150px;border-radius: 5px;overflow: hidden; background-color: #fff"/></a>
            
            <p class="footer" style="font-size: 16px;">Best regards,<br>Yogyakarta International Airport</p>
            <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">PT. Angkasa Pura I</p>
            <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
            <a href="https://rifqimaulana.xyz/" style="text-decoration: none;margin: 8px;color: #1B2D45;">Rifqi Maulana</a>
            </div>
            </div>
    </body>
    </html>
    `
  }

export const authorityMailHTML =
  (namaBarang, jenisBarang, lokasiTemuanBarang, warnaBarang, foundDate, fotoBarang, helperPhoneNumber, user) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Notification</title>
      <meta name="description" content="Notification">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <link rel="stylesheet" href="css/styles.css?v=1.0">
    </head>
    
    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
            </div>
            <div class="container" style="margin-left: 20px;margin-right: 20px;">
            <h3>⚠️ Temuan barang terbaru!</h3>
            <div style="font-size: 16px;">
            <p>
            Rincian Barang Temuan: <br />
            Nama Barang: ${namaBarang} <br />
            Jenis Barang: ${jenisBarang} <br />
            Lokasi Temuan Barang: ${lokasiTemuanBarang} <br />
            Warna Barang: ${warnaBarang} <br />
            Tanggal Temuan Barang: ${foundDate} <br />
            Foto Barang: ${fotoBarang} <br />
            Nomor Telepon Pelapor: ${helperPhoneNumber} <br />
            Email Pelapor: ${user.email} <br />
            Nama Pelapor: ${user.displayName} <br />
            </p>
            <p>
            Dimohon untuk melakukan review dan menghubungi pelapor secepat mungkin!
            </p>
            <br />
            </div>
            <a href="http://localhost:3000/"><img src="https://firebasestorage.googleapis.com/v0/b/lost-found-yia.appspot.com/o/foundItemsImage%2FMpuklX20190503080722.png?alt=media&token=968b82a1-248a-4c0e-8659-8e0b39813d97" class="logo-image" style="height: 50px;width: 150px;border-radius: 5px;overflow: hidden; background-color: #fff"/></a>
            
            <p class="footer" style="font-size: 16px;">Best regards,<br>Yogyakarta International Airport</p>
            <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">PT. Angkasa Pura I</p>
            <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
            <a href="https://rifqimaulana.xyz/" style="text-decoration: none;margin: 8px;color: #1B2D45;">Rifqi Maulana</a>
            </div>
            </div>
    </body>
    </html>
    `
  }