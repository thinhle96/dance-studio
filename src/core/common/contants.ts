export enum ErrorCode {
    REPEAT_PASSWORD_NOT_VALID = 'Mật khẩu xác nhận không đúng',
    ROLE_EXIST = 'Role đã tồn tại',
    ROLE_NOT_EXIST = 'Role không tồn tại',
    USER_NOT_EXIST = 'Người dùng không tồn tại',
    CARD_TYPE_NOT_EXIST = 'Loại thẻ không tồn tại',
    CARD_TYPE_EXIST = 'Loại thẻ đã tồn tại',
    SUBJECT_EXIST = 'Môn học đã tồn tại',
    SUBJECT_NOT_EXIST = 'Môn học không tồn tại',
}

export const enum DateFormat {
    DEFAULT = 'yyyy-MM-dd',
}

export const enum Locale {
    DEFAULT = 'vi_VN',
}

export const CoreLoanStatus = {
    UNDOAPPROVAL: 'UNDOAPPROVAL',
    PENDING: 'PENDING',
    APPROVE: 'APPROVE',
    WITHDRAW: 'WITHDRAW',
    REJECT: 'REJECT',
    DISBURSE: 'DISBURSE',
};
