import React, { useEffect, useState } from "react";
import { deletePatient, fetchAllPatients } from "../services/patientService";
import "./patientPage.scss";
import HandleError from "../../../core/sharedComponents/HandleError";
import { useNavigate } from "react-router-dom";

const PatientPage = () => {
    const [patients, setPatients] = useState([]);
    const[errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchAllPatientsFromDb = async () => {
        try {
            const patientsFromDb = await fetchAllPatients();
            console.log(patientsFromDb);
            setPatients(patientsFromDb)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAllPatientsFromDb();
    }, [])

    const getFormatedDate = (date) => {
        const stringDate = new Date(date).toISOString();
        return `${stringDate.substring(8,10)}.${stringDate.substring(5,7)}.${stringDate.substring(0,4)}.`
    }
     const handleClickDeletePatient = async (id)=>{
        try {
             await deletePatient(id);
             fetchAllPatients();
        } catch (error) {
            HandleError(
                error,
                setErrorMessage,
                undefined,
                "",
                "Patient",
                "Patient"
            )
        }
     }

    

    return (
        <div className="patients-page">
            <div className="add-patient-button-wrapper">
                <button 
                className="btn btn-primary"
                onClick={()=>navigate("/add-patient")}
                >
                    Add patient
                </button>
            </div>
            {patients.length > 0 && (
                <div className="patients-table-wrapper">
                    <table className="patient-table" >
                        <thead>
                            <tr>
                                <th>Ime pacijenta</th>
                                <th>Vrsta</th>
                                <th>Ime vlasnika</th>
                                <th>Datum rodjenja</th>
                                <th> </th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr
                                    key={patient.id}

                                >
                                    <td>{patient.name}</td>
                                    <td>{patient.animalSpecies.name}</td>
                                    <td>{patient.owner.user.name} {patient.owner.user.surname}</td>
                                    <td>{getFormatedDate(patient.dateOfBirth)}</td>

                                    {/* <td>{animal.cage?.code
                                        ?
                                        animal.cage.code
                                        :
                                        (<select
                                            value={selectedCages[animal.id]}
                                            onChange={e => handleSelectChange(animal.id, Number(e.target.value))}
                                        >
                                            {cages?.map(cage => (
                                                <option
                                                    key={cage.id}
                                                    value={cage.id}
                                                >
                                                    {cage.code}
                                                </option>
                                            ))}
                                        </select>)
                                    }
                                    </td> */}
                                    {/* <td><button
                                        className={"put-in-cage-button positive-action"}
                                        onClick={() => {
                                            const cageId = selectedCages[animal.id];
                                            handlePutInCageBtn(animal, cageId);
                                        }}
                                        disabled={animal.cage !== null}
                                    >
                                        Put in cage
                                    </button>
                                    </td> */}
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleClickEditPatient}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                             onClick={() => handleClickDeletePatient(patient.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
export default PatientPage;