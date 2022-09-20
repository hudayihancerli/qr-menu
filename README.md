﻿# QR MENU

### Kullanılan teknolojiler
- HTML
- CSS
- JavaScript
- Node.js
- MongoDB

**controllers** > *category, page, product, user*
**models** > *category, product, user*
**views** > *index, admin, 404, category, createcategory, create product, login, updateCategory, updateProduct*
**public** > *css, img, uploads*

###  Uygulamayı nasıl çalıştırabilirim?

1.  cmd'yi açın.

2.  Uygulamanın oluşturulmasını istediğiniz dizini seçin. `cd desktop`

3.  `git clone https://github.com/hudayihancerli/qr-menu.git`

4. Uygulama dizinine gelin  ` cd qr-menu` ve vsCodeyi başlatın `code .`  

5. Terminli çalıştırıp `npm i` komutunu girerek bağımlılıkları yükleyin.

6. Ana dizine .env  dosyası oluşturun.

7. Tarayıcınızdan mongodb'ye giriş yapın ve veritabanızın bağlantı kodunu kopyalayın

8. .env içerisinde 'MONGO_URL=Bağlantıkodu'  şeklinde yapıştırın ve bilgilerinizi düzenleyin

9. Terminale gelip `npm run start` yazın.

10. Admin adı ve şifresini veritabanınız users bölümüne userName, userPass adıyla kaydedin. örneğin: `userName: admin` `userPass: admin123`

11. Terminalde verilen link'i açın.

12. Admin girişi için anasayfadayken urlnizin sonuna /login yazın ve giriş yapın

13. Tebrikler 👏👏 ürünü istediğiniz gibi kullanabilirsiniz. 😎
