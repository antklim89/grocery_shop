import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import type { createOrderStore } from './CreateOrderModal';

import Alert from '~/components/utils/Alert';


interface Props {
    inputStore: typeof createOrderStore
}

const CreateOrderForm: FC<Props> = ({ inputStore }) => {
    return (
        <form className="row">
            <Alert message={inputStore.errorMessage} type="error" />
            <div className="mb-3 col-sm-6 col-12">
                <label className="w-100" htmlFor="email">
                    Name:
                    <input
                        required
                        autoComplete="username"
                        className="form-control"
                        id="name"
                        type="text"
                        value={inputStore.name}
                        onChange={(e) => inputStore.setValue('name', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-sm-6 col-12">
                <label className="w-100" htmlFor="email">
                    Surname:
                    <input
                        required
                        autoComplete="surname"
                        className="form-control"
                        id="surname"
                        type="text"
                        value={inputStore.surname}
                        onChange={(e) => inputStore.setValue('surname', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-12">
                <label className="w-100" htmlFor="email">
                    E-mail:
                    <input
                        required
                        autoComplete="username"
                        className="form-control"
                        id="email"
                        type="email"
                        value={inputStore.email}
                        onChange={(e) => inputStore.setValue('email', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-12">
                <label className="w-100" htmlFor="email">
                    Address:
                    <input
                        required
                        autoComplete="address"
                        className="form-control"
                        id="address"
                        type="text"
                        value={inputStore.address}
                        onChange={(e) => inputStore.setValue('address', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-12">
                <label className="w-100" htmlFor="email">
                    Phone number:
                    <input
                        required
                        autoComplete="phone"
                        className="form-control"
                        id="phone"
                        type="tel"
                        value={inputStore.phone}
                        onChange={(e) => inputStore.setValue('phone', e.target.value)}
                    />
                </label>
            </div>
        </form>
    );
};

export default observer(CreateOrderForm);
