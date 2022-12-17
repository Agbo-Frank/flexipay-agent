import { AlertColor } from "@mui/material";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export interface ICreateAccountBody {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    bvn: string
}
export interface IFundWalletResponse{
    data: {
        link: string
    }
}

export interface IGetTransactionResponse {
    current_page: number;
    data: ITransacation[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean
    }[],
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    total: number;
    to: 15
}
export interface ITransacation {
    reference?: string;
    amount: string;
    charges: string;
    prev_balance: string;
    new_balance: string;
    status: "SUCCESSFUL";
    type: "DEBIT" | "CREDIT";
    created_at: string;
    updated_at: string;
    info: string
}

export interface IModal extends React.PropsWithChildren {
    isOpen: boolean,
    size?: 'medium' | 'large';
    title?: string;
    closeModal?: () => any,
    components?: JSX.Element
}

export interface IWalletBalanceProps {
    open: {
        createAccForm: boolean;
        fundWallet: boolean;
        withdraw: boolean
    },
    setOpen: React.Dispatch<React.SetStateAction<{
        createAccForm: boolean;
        fundWallet: boolean;
        withdraw: boolean
    }>>
}

export interface ISelectOptions {
    value: string;
    label: string
}

export interface IUserTransacation {
    user_id: number;
    reference?: string;
    amount: string;
    service_type: string;
    service_provider: string;
    service_number: string;
    status: string;
    created_at: string;
    updated_at: string;
    narration: string
}

export interface IPagination<T> {
    current_page: number;
    data: T;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean
    }[],
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    total: number;
    to: number
}

export interface IWalletDetails {
    uuid: string;
    account_number: string;
    account_reference: string;
    balance: string;
    referral_balance: string;
    status: string;
    account_name: string;
    bank_name: string;
}
export interface IBanks {
    cbn_code: string;
    bank_name: string
}

export interface IWithdraw {
    bank_code: string;
    account_number: string;
    amount: string;
    redirect_url?: string;
    full_name: string;
}

export interface IAgentWithdraw {
    account_name: string;
    bank_name: string;
    account_number: string;
    amount: string;
}

export interface IFundWalletByCard {
    full_name: string;
    email: string;
    phone_number: string;
    amount: string;
    redirect_url?: string;
}

export interface IUser {
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number?: string;
    phone?: string;
    state?: string;
    gender?: string;
    city?: string;
    address?: string;
    house_address?: string;
    postal_code?: string;
    nearest_bus_stop?: string;
    dob?: string;
    referral_link?: string;
    bank_account?: {
        account_number: string;
        bank_name: string;
        account_name: string;
        approved: false
    },
    reserved_account?: {
        account_number: string;
        bank_code: string;
        order_reference: string;
        reference: string;
    }
}

export interface IResponse<T> {
    message: string;
    status: 'failed' | 'success';
    result:  T
}

export interface IAuthResponse extends IResponse<{data: IUser}> {
    is_verified?: boolean;
    token?: string
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string
}

export interface IResetPassword {
    email: string;
    token: string;
    password: string;
    password_confirmation: string
}

export interface IChangePassword {
    old_password: string;
    passwor: string;
    password_confirmation: string;
    previous_password?: string
}

export interface IModalReducer {
    orderDetails: boolean,
    trackOrder: boolean,
    productReview: boolean,
    addAddress: boolean,
    addCreditCard: boolean,
    withdrawalForm: boolean,
    editProfile: boolean,
    snackBar: {
        open: boolean;
        message: string;
        severity: AlertColor;
    }
}

export interface Iicon {
    size: string;
    color: string;
    line?: boolean
}

export interface IInputPropsNoFormik {
    Icon?: React.FC<Iicon>;
    type: string;
    name: string;
    label?: string;
    value: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export interface IDateInput {
    label: string,
    name: string;
    formik?: any
}

export interface ISelectInput {
    label: string,
    data?: {value: string, label: string}[],
    name: string;
    // cb?: (a?: string) => any
    onChange?: (a?: string) => any | void
    formik: any;
    mb?: boolean;
    info?: string
}

export interface IAutoComplete {
    label: string,
    data: readonly any[],
    name: string;
    onChange?: (a?: any) => any | void;
    formik: any;
    size?: 'small' | 'large';
    loading?: boolean;
    getOptions?: (option: any) => any
    defaultValue?: any
}

export interface IInputProps {
    Icon?: React.FC<Iicon>;
    type: string;
    name: string;
    label?: string;
    formik: any;
    className?: any;
    info?: any;
    mb?: any
}

export type ITrigger<T, Response> = MutationTrigger<MutationDefinition<T, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, Response, "Auth">>

export interface IAgentUsers {
    uuid: string;
    first_name: string;
    last_name: string;
    referrer_id: string;
    email: string;
    referrer_links: string;
    ref_code: string;
    avatar: string;
    address: string;
    dob: string;
    linkedin_url: string;
    phone_number: string;
}

export interface IAgentWallet {
    id: number;
    current_balance: number;
    total_earning: number;
    total_withdrawal: number;
}

export interface IAgentDashboardDetails {
    users: number;
    account: {
        id: number;
        user_id: number;
        current_balance: number;
        total_earning: number;
        total_withdrawal: number;
        created_at: Date;
        updated_at: Date;
    };
}