import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { criteriaEdit } from "../../slices/sliceCriteria";

export default function CriteriaEdit() {
    const dispatch = useDispatch();
    const { createStatus, stateCriteria } = useSelector((state) => state.criteria);
    const { cId } = useParams();
    const navigate = useNavigate();

    const [nameCriteria, setNameCriteria] = useState("");
    const [subStart1, setSubStart1] = useState(0);
    const [subEnd1, setSubEnd1] = useState(0);
    const [subWeight1, setSubWeight1] = useState(0);
    const [subStart2, setSubStart2] = useState(0);
    const [subEnd2, setSubEnd2] = useState(0);
    const [subWeight2, setSubWeight2] = useState(0);
    const [subStart3, setSubStart3] = useState(0);
    const [subEnd3, setSubEnd3] = useState(0);
    const [subWeight3, setSubWeight3] = useState(0);
    const [subStart4, setSubStart4] = useState(0);
    const [subEnd4, setSubEnd4] = useState(0);
    const [subWeight4, setSubWeight4] = useState(0);
    const [subStart5, setSubStart5] = useState(0);
    const [subEnd5, setSubEnd5] = useState(0);
    const [subWeight5, setSubWeight5] = useState(0);
    const selectedCri = stateCriteria.find((item) => item.criteria_id === parseInt(cId, 10));
    console.log(cId);

    useEffect(() => {
        if (selectedCri) {
            setNameCriteria(selectedCri.criteria_name);
            setSubStart1(selectedCri.sub_start_1);
            setSubEnd1(selectedCri.sub_end_1);
            setSubWeight1(selectedCri.sub_weight_1);
            setSubStart2(selectedCri.sub_start_2);
            setSubEnd2(selectedCri.sub_end_2);
            setSubWeight2(selectedCri.sub_weight_2);
            setSubStart3(selectedCri.sub_start_3);
            setSubEnd3(selectedCri.sub_end_3);
            setSubWeight3(selectedCri.sub_weight_3);
            setSubStart4(selectedCri.sub_start_4);
            setSubEnd4(selectedCri.sub_end_4);
            setSubWeight4(selectedCri.sub_weight_4);
            setSubStart5(selectedCri.sub_start_5);
            setSubEnd5(selectedCri.sub_end_5);
            setSubWeight5(selectedCri.sub_weight_5);
        }
    }, [cId, stateCriteria]);

    const handleEditCriteria = async (e) => {
        e.preventDefault();
        
        dispatch(criteriaEdit({
            criteria: {
                criteriaId: parseInt(cId, 10),
                subStart1: parseInt(subStart1, 10), 
                subEnd1: parseInt(subEnd1, 10), 
                subWeight1: parseInt(subWeight1, 10), 
                subStart2: parseInt(subStart2, 10), 
                subEnd2: parseInt(subEnd2, 10), 
                subWeight2: parseInt(subWeight2, 10), 
                subStart3: parseInt(subStart3, 10), 
                subEnd3: parseInt(subEnd3, 10), 
                subWeight3: parseInt(subWeight3, 10), 
                subStart4: parseInt(subStart4, 10), 
                subEnd4: parseInt(subEnd4, 10), 
                subWeight4: parseInt(subWeight4, 10), 
                subStart5: parseInt(subStart5, 10), 
                subEnd5: parseInt(subEnd5, 10), 
                subWeight5: parseInt(subWeight5, 10)
            }
        }));
        navigate("/admin/criteria");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[800px]">
                <h1 className="font-bold text-xl mb-3">Edit Kriteria {nameCriteria}</h1>
                <form onSubmit={handleEditCriteria}>
                    <div className="flex flex-row mb-3">
                        <label className="flex w-[500px] text-sm font-medium text-gray-900 dark:text-white items-center justify-center">
                            Sub Kriteria 1
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Awal 1"
                            value={subStart1}
                            onChange={(e) => setSubStart1(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">~</div>
                        <input
                            className="bg-gray-50 border border-gray-300 number-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Akhir 1"
                            value={subEnd1}
                            onChange={(e) => setSubEnd1(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">=</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Bobot 1"
                            value={subWeight1}
                            onChange={(e) => setSubWeight1(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row mb-3">
                        <label className="flex w-[500px] text-sm font-medium text-gray-900 dark:text-white items-center justify-center">
                            Sub Kriteria 2
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Awal 2"
                            value={subStart2}
                            onChange={(e) => setSubStart2(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">~</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Akhir 2"
                            value={subEnd2}
                            onChange={(e) => setSubEnd2(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">=</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Bobot 2"
                            value={subWeight2}
                            onChange={(e) => setSubWeight2(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row mb-3">
                        <label className="flex w-[500px] text-sm font-medium text-gray-900 dark:text-white items-center justify-center">
                            Sub Kriteria 3
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Awal 3"
                            value={subStart3}
                            onChange={(e) => setSubStart3(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">~</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Akhir 3"
                            value={subEnd3}
                            onChange={(e) => setSubEnd3(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">=</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Bobot 3"
                            value={subWeight3}
                            onChange={(e) => setSubWeight3(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row mb-3">
                        <label className="flex w-[500px] text-sm font-medium text-gray-900 dark:text-white items-center justify-center">
                            Sub Kriteria 4
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Awal 4"
                            value={subStart4}
                            onChange={(e) => setSubStart4(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">~</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Akhir 4"
                            value={subEnd4}
                            onChange={(e) => setSubEnd4(e.target.value)}
                            required    
                        />
                        <div className="flex mx-[10px] items-center justify-center">=</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Bobot 4"
                            value={subWeight4}
                            onChange={(e) => setSubWeight4(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row mb-3">
                        <label className="flex w-[500px] text-sm font-medium text-gray-900 dark:text-white items-center justify-center">
                            Sub Kriteria 5
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Awal 5"
                            value={subStart5}
                            onChange={(e) => setSubStart5(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">~</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Batas Akhir 5"
                            value={subEnd5}
                            onChange={(e) => setSubEnd5(e.target.value)}
                            required
                        />
                        <div className="flex mx-[10px] items-center justify-center">=</div>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Bobot 5"
                            value={subWeight5}
                            onChange={(e) => setSubWeight5(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>

        </div>
    );
}
