import { Dispatch, SetStateAction } from 'react';


interface Props {
    values: {
        email: string
        name: string
        surname: string
        address: string
        phone: string
    }
    setValues: {
        setEmail: Dispatch<SetStateAction<string>>
        setName: Dispatch<SetStateAction<string>>
        setSurname: Dispatch<SetStateAction<string>>
        setAddress: Dispatch<SetStateAction<string>>
        setPhone: Dispatch<SetStateAction<string>>
    }
}

export default function CreateOrderForm({ values, setValues }: Props): JSX.Element {
    return (
        <form className="row">
            <div className="mb-3 col-sm-6 col-12">
                <label className="w-100" htmlFor="email">
                    Name:
                    <input
                        required
                        autoComplete="username"
                        className="form-control"
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={(e) => setValues.setName(e.target.value)}
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
                        value={values.surname}
                        onChange={(e) => setValues.setSurname(e.target.value)}
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
                        value={values.email}
                        onChange={(e) => setValues.setEmail(e.target.value)}
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
                        value={values.address}
                        onChange={(e) => setValues.setAddress(e.target.value)}
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
                        value={values.phone}
                        onChange={(e) => setValues.setPhone(e.target.value)}
                    />
                </label>
            </div>
        </form>
    );
}
