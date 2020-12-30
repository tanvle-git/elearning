import * as Yup from 'yup';

export const newCourseSchema = Yup.object().shape({
    maKhoaHoc: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(20, 'Tối đa 20 ký tự!')
        .required('Bắt buộc!'),
    biDanh: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(100, 'Tối đa 100 ký tự!')
        .required('Bắt buộc!'),
    tenKhoaHoc: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(100, 'Tối đa 100 ký tự!')
        .required('Bắt buộc!'),
    moTa: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(1000, 'Tối đa 1000 ký tự!')
        .required('Bắt buộc!'),
    luotXem: Yup.number()
        .moreThan(-1, 'Không được là số âm!')
        .integer('Phải là số nguyên!')
        .required('Bắt buộc!'),
    danhGia: Yup.number()
        .moreThan(-1, 'Không được là số âm!')
        .integer('Phải là số nguyên!')
        .required('Bắt buộc!'),
    hinhAnh: Yup.mixed()
        .required('Bắt buộc!'),
    maDanhMucKhoaHoc: Yup.string()
        .required('Bắt buộc!')
});
export const userSchema = Yup.object().shape({
    soDT: Yup.string()
        .matches(/^[0-9]*$/, 'Số điện thoại không hợp lệ!')
        .required('Bắt buộc!'),
    email: Yup.string()
        .email('Email không hợp lệ!')
        .required('Bắt buộc!'),
    taiKhoan: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(20, 'Tối đa 20 ký tự!')
        .required('Bắt buộc!')
        .matches(/^[a-zA-Z0-9_.-]*$/, 'Chỉ bao gồm chữ, số, gạch dưới "_", gạch giữa "-" và dấu chấm!'),
    hoTen: Yup.string()
        .required('Bắt buộc!')
        .matches(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/, 'Vui lòng nhập đúng họ tên của bạn (không dấu)!'),
    matKhau: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .required('Bắt buộc!'),
    maLoaiNguoiDung: Yup.string()
        .required('Bắt buộc!'),
});


export const signInSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(20, 'Tối đa 20 ký tự!')
        .required('Bắt buộc!')
        .matches(/^[a-zA-Z0-9_.-]*$/, 'Tên đăng nhập không hợp lệ!'),
    password: Yup.string()
        .required('Bắt buộc!'),
});
export const signUpSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^[0-9]*$/, 'Số điện thoại không hợp lệ!')
        .required('Bắt buộc!'),
    email: Yup.string()
        .email('Email không hợp lệ!')
        .required('Bắt buộc!'),
    username: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .max(20, 'Tối đa 20 ký tự!')
        .required('Bắt buộc!')
        .matches(/^[a-zA-Z0-9_.-]*$/, 'Chỉ bao gồm chữ, số, gạch dưới "_", gạch giữa "-" và dấu chấm!'),
    fullName: Yup.string()
        .required('Bắt buộc!')
        .matches(/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/, 'Vui lòng nhập đúng họ tên của bạn (không dấu)!'),
    password: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự!')
        .required('Bắt buộc!'),
    termsAndConditions: Yup.boolean()
        .oneOf([true], "Bắt buộc!"),
});
