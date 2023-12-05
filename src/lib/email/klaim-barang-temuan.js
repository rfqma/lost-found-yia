export const userMailHTML =
  (claimersEmail, claimersEmailDisplayName, claimersPhoneNumber, claimersItemColor, claimersItemDescription, item) => {
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
            <h3>👋🏼 Halo ${claimersEmailDisplayName}!</h3>
            <div style="font-size: 16px;">
            <p>
            Pengajuan klaim barang temuan untuk ${item.namaBarang} sudah kami terima!
            </p>
            <p>
            Rincian: <br />
            Nama Barang: ${item.namaBarang} <br />
            Email: ${claimersEmail} <br />
            Nomor Telepon: ${claimersPhoneNumber} <br />
            <br />
            Warna Barang: ${claimersItemColor} <br />
            Deskripsi Barang: ${claimersItemDescription} <br />
            </p>
            <p>
            Kami akan melakukan verifikasi terhadap data yang telah kamu berikan.
            <br />
            Jika kamu tidak dihubungi lagi, silahkan hubungi kami kembali.
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
  (claimersEmail, claimersEmailDisplayName, claimersPhoneNumber, claimersItemColor, claimersItemDescription, item) => {
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
            <h3>⚠️ Permintaan klaim barang temuan oleh!</h3>
            <div style="font-size: 16px;">
            <p>
            Informasi dari database: <br />
            Nama Barang: ${item.namaBarang} <br />
            Jenis Barang: ${item.jenisBarang}
            Warna Barang: ${item.warnaBarang} <br />
            Lokasi Ditemukan: ${item.lokasiTemuanBarang} <br />
            </p>
            <p>
            Detail klaim: <br />
            Nama: ${claimersEmailDisplayName} <br />
            Email: ${claimersEmail} <br />
            Nomor Telepon: ${claimersPhoneNumber} <br />
            Warna Barang: ${claimersItemColor} <br />
            Deskripsi Barang: ${claimersItemDescription} <br />
            </p>
            <p>
            Dimohon untuk melakukan pencocokan deskripsi data klaim dari user dengan data barang di database. <br />
            Dimohon untuk memberikan feedback dan respon kepada user terkait hasil pencocokan data tersebut maksimal 48 jam!.
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