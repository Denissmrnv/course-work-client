import { useState } from "react";
import axios from "axios";
import FishermenList from "./FishermenList";

const FishermenCrud = ({ load, fishermens }) => {
    /* state definition  */
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState<number>(0)
    const [experience, setExperience] = useState<number>(0);

    /* being handlers */
    async function save(event) {
        event.preventDefault();
        await axios.post("/fishermen", {
            fullName: fullName,
            age: age,
            experience: experience,
        });
        alert("Fishermen Record Saved");
        // reset state
        setId("");
        setFullName("");
        setAge(0);
        setExperience(0);
        load();
    }
    async function editFishermen(fishermens) {
        setFullName(fishermens.fullName);
        setAge(fishermens.age);
        setExperience(fishermens.experience);
        setId(fishermens.id);
    }

    async function deleteEmployee(id) {
        await axios.delete("/fishermen/" + id);
        alert("Fishermen Details Deleted Successfully");
        load();
    }

    async function update(event) {
        event.preventDefault();
        if (!id) return alert("Publisher Details No Found");
        await axios.put("/update", {
            id: id,
            fullName: fullName,
            age: age,
            experience: experience,
        });
        alert("Fishermen Details Updated");
        // reset state
        setId("");
        setFullName("");
        setAge(0);
        setExperience(0);
        load();
    }
    /* end handlers */

    /* jsx */
    return (
        <div className="container mt-4">
            <form>
                <div className="form-group my-2">
                    <input
                        type="text"
                        className="form-control"
                        hidden
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <label>Имя</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Возраст</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={e => setAge(+e.target.value)}
                    />
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>Опыт</label>
                        <input
                            type="number"
                            className="form-control"
                            value={experience}
                            placeholder="Published Post(s)"
                            onChange={e => setExperience(+e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button className="btn btn-primary m-4" onClick={save}>
                        Создать
                    </button>
                    <button className="btn btn-warning m-4" onClick={update}>
                        Обновить
                    </button>
                </div>
            </form>
            <FishermenList
                fishermens={fishermens}
                editFishermen={editFishermen}
                deleteFishermen={deleteEmployee}
            />
        </div>
    );
};

export default FishermenCrud;