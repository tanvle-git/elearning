const stateFeedback = {
    feedback:[
        {nguoiDung:'Dustin Nguyễn', avt:'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', chucDanh:'Front-end developer', binhLuan:'E-learning đã thay đổi cuộc đời tôi. Tôi vừa có thể vừa đi làm, vừa tự học online vào buổi tối. Nhờ thế, hiện tại tôi đã có thể chinh phục được mức lương mơ ước $4000'},
        {nguoiDung:'William', avt:'https://images.pexels.com/photos/6037405/pexels-photo-6037405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', chucDanh:'GIS technician', binhLuan:'Tôi không hài lòng với công việc làm data nhàm chán của mình. Tôi đã quyết định học lập trình tại E-Learning. Bất ngờ thay, tôi đã cải thiện được công việc của mình, ứng dụng và phát triển sản phẩm mới, được thăng chức mới, được nhiều người mến mộ.'},
        {nguoiDung:'Julia Phạm', avt:'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', chucDanh:'Artist', binhLuan:'Tôi không hài lòng với công việc làm data nhàm chán của mình. Tôi đã quyết định học lập trình tại E-Learning. Bất ngờ thay, tôi đã cải thiện được công việc của mình, ứng dụng và phát triển sản phẩm mới, được thăng chức mới, được nhiều người mến mộ.'},
        {nguoiDung:'Phong Le', avt:'https://images.pexels.com/photos/1153334/pexels-photo-1153334.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', chucDanh:'Back-end developer', binhLuan:'E-learning đã thay đổi cuộc đời tôi. Tôi vừa có thể vừa đi làm, vừa tự học online vào buổi tối. Nhờ thế, hiện tại tôi đã có thể chinh phục được mức lương mơ ước $4000'},
       
    ],
}

 const FeedbackReducer = ( state = stateFeedback, action) => {
    return {...state};
    }

export default FeedbackReducer;