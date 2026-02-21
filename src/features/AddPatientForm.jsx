import React from "react";
import { useForm } from "react-hook-form";
const AddPatientForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm()

    const onSubmit = (data) => {
        console.log(`submit data: `, data);
    }

    return (
        <div className="add-patient-form-container">
            <form
                className="add-patient-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-group">
                    <label htmlFor="name">Ime ljubimca</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Unesite ime ljumbimca"
                        {...register("name", { required: "Ime ljubimca je obavezno!" })}
                    />
                    <span className="error-message">{errors?.name?.message}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Ime ljubimca</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Unesite ime ljumbimca"
                        {...register("name", { required: "Ime ljubimca je obavezno!" })}
                    />
                    <span className="error-message">{errors?.name?.message}</span>
                </div>

            </form>
        </div>
    );

};
export default AddPatientForm;