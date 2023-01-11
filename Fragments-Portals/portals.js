// - Portals cho phép chúng ta render một component ở một vị trí bất kỳ trong DOM Tree, điều này có ý nghĩa khi chúng ta muốn
// render một modal component với lớp phủ overlay cho toàn bộ trang web.
// - Với việc chúng ta render modal component với lớp phủ overlay ở bên ngoài root element sẽ có ý nghĩa hơn trong "tư duy
// lập trình" (HTML Semantic).
// - Để sử dụng Portals, chúng ta cần phải xác định 2 thứ:
//    - Vị trí cần render của component đó trong DOM Tree.
//    - Phải cung cấp cổng "portals" để component đó render.

// - Giả sử chúng ta sẽ render một modal form ở bên ngoài root element, thì trong file index.html chúng ta phải tạo một thẻ
// div với id là "modal-form" bên cạnh thẻ root.
// - Ví dụ:
/* <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <title>React App</title>
      </head>
      <body>
        <div id="modal-form">
        <div id="root"></div>
      </body>
    </html> */
// - Thẻ div với id là "modal-form" sẽ là vị trí mà chúng ta sẽ render modal component
// - Sau khi chúng ta đã xác định được vị trí để render compoent, chúng ta sẽ tạo một "portals" bằng phương thức createPortal
// của thư viện react-dom.
// - Phương thức này sẽ giúp chúng ta tạo một pointer (cổng) đến vị trí mà chúng ta chỉ định sẳn để render ra component.
// - Phương thức createPortal cần 2 đối số truyền vào, đối số đầu tiên là component mà chúng ta muốn render, đối số thứ hai
// là element trong cây DOM (tức là vị trí chúng ta cần render).
// - Ví dụ:
/* ReactDOM.createPortal(<ModalForm />, document.getElementById("modal-form")) */
