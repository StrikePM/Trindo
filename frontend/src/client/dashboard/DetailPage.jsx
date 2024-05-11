import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DetailPage() {
    const { stateProducts } = useSelector((state) => state.products);
    const { spId } = useParams();

    const selectedProd = stateProducts.find((item)=>item.product_id == parseInt(spId, 10));
    console.log(selectedProd);
    return (
        <div className="flex bg-white w-full h-full items-center justify-center py-[40px]">
            <div className="flex flex-col w-[900px] h-[600px] rounded-md overflow-hidden border-gray-200 border-[1px] shadow-md">
                <div className="flex flex-row w-full h-[85%]">
                    <div className="w-[60%] h-full p-[20px]">
                        <img className="w-full h-full object-fill" src={selectedProd.product_image} alt="" />
                    </div>
                    <div className="flex flex-col w-[40%] h-full py-[20px] px-[20px] border-l-[1px]">
                        <span className="text-4xl text-ellipsis font-bold overflow-hidden mb-[10px]">{selectedProd.product_name}</span>
                        <span className="text-3xl text-ellipsis text-red-700 font-bold overflow-hidden mb-[10px]">{selectedProd.category_name}</span>
                        <span className="text-xl text-ellipsis overflow-hidden mb-[10px]">{selectedProd.product_desc}</span>
                        <div className="flex items-center justify-center">
                            <span className="text-4xl text-ellipsis font-bold overflow-hidden mb-[10px]">Rp{selectedProd.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[15%] border-t-[1px]">
                    <div className="flex w-full h-full items-center justify-center p-[20px]">
                        <button className="w-full h-full bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold rounded">Masukan Keranjang</button>
                    </div>
                </div>
            </div>
        </div>
    );
}