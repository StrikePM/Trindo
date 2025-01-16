import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesFetch } from "../../slices/sliceCategories";
import { productsFetch } from "../../slices/sliceProducts";
import { useNavigate } from "react-router-dom";
import { rankWrenchFetch } from "../../slices/sliceRankWrench";
import { rankHammerFetch } from "../../slices/sliceRankHammer";
import { rankDrillFetch } from "../../slices/sliceRankDrill";
import { rankGrinderFetch } from "../../slices/sliceRankGrinder";

export default function Homepage(c) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stateCategories, stateRefreshCategories } = useSelector((state) => state.categories);
    const { stateProducts, stateRefreshProd } = useSelector((state) => state.products);
    const { stateRankWrench, stateRefreshRankWrench } = useSelector((state) => state.rankWrench);
    const { stateRankHammer, stateRefreshRankHammer } = useSelector((state) => state.rankHammer);
    const { stateRankDrill, stateRefreshRankDrill } = useSelector((state) => state.rankDrill);
    const { stateRankGrinder, stateRefreshRankGrinder } = useSelector((state) => state.rankGrinder);

    console.log(stateProducts);

    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        dispatch(categoriesFetch());
        dispatch(productsFetch());
        dispatch(rankWrenchFetch());
        dispatch(rankHammerFetch());
        dispatch(rankDrillFetch());
        dispatch(rankGrinderFetch());
    }, [selectedCategory]);

    const filteredProducts = stateProducts && stateProducts.filter((product) => {
        // Filter by category name
        if (selectedCategory && product.category_id !== selectedCategory) {
            return false;
        }

        // Filter by search text
        if (searchText && !product.product_name.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }

        return true;
    });

    const catImg = [
        {
            id: 1,
            img: "https://res.cloudinary.com/dddrzjxb0/image/upload/v1715055290/qshvepzmu0lvjsbsvydt.jpg",
            by: "https://www.freepik.com/free-photo/close-up-tools-mechanic_8453436.htm#fromView=search&page=1&position=6&uuid=20438762-ed3f-4882-a253-a87c6881d532"
        },
        {
            id: 2,
            img: "https://res.cloudinary.com/dddrzjxb0/image/upload/v1715055343/eymkyq8dua8jmplwcuu4.jpg",
            by: "https://www.freepik.com/free-photo/top-view-construction-hammers-still-life_49478970.htm#fromView=search&page=1&position=4&uuid=5c589b9c-1d5c-4e45-8164-4f8993ba664d"
        },
        {
            id: 3,
            img: "https://res.cloudinary.com/dddrzjxb0/image/upload/v1715055291/bqzvrzcjmzxsafbydadz.jpg",
            by: "https://www.freepik.com/free-photo/perforator-with-nozzles-near-protection-stuff_4892687.htm#fromView=search&page=1&position=1&uuid=a00d6edc-d62c-414a-8a85-d62382b12cb5"
        },
        {
            id: 4,
            img: "https://res.cloudinary.com/dddrzjxb0/image/upload/v1715055288/fqaqsxbg1n8jrmjrbjod.jpg",
            by: "https://www.freepik.com/free-photo/close-up-tools-mechanic_8453436.htm#fromView=search&page=1&position=6&uuid=03b09f23-da40-4e40-813e-95e72259286a"
        },
    ];

    return (
        <div className="bg-gradient-to-r from-white via-white to-white w-full h-fit">
            <div className="flex flex-row w-full h-[500px]">
                <div className="bg-white-100 w-[50%] h-full py-[30px] pl-[30px] pr-[15px]">
                    <div className="w-[100%] h-[100%] shadow-lg rounded-md overflow-hidden">
                        <img className="w-full h-full" src="https://res.cloudinary.com/dddrzjxb0/image/upload/v1715013036/jqbohxkkfwmolb8qtoc2.jpg" alt="facom" />
                    </div>
                </div>
                <div className="flex flex-col w-[50%] h-full py-[30px] pr-[30px] pl-[15px]">
                    <div className="flex flex-row w-[100%] h-[100%] pb-[10px]">
                        <button onClick={() => navigate(`/detail/${stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id).product_id}`)} className="flex flex-row w-[50%] h-[100%] shadow-md rounded-md mr-[10px] border-gray-200 border-[1px] overflow-hidden hover:-translate-y-0 hover:scale-110 hover:bg-white duration-100 active:scale-100">
                            <div className="flex flex-col w-[40%] h-full border-r-[1px] items-center justify-center">
                                <span className="text-md">{stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id).product_name : ""}</span>
                                <span className="text-md text-red-700">{stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id).category_name : ""}</span>
                                <span className="text-md font-bold">Rp{stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id).product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""}</span>
                            </div>
                            <img className="w-[60%] h-full" src={stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankWrench[0].product_id).product_image : ""} alt="" />
                        </button>
                        <button onClick={() => navigate(`/detail/${stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id).product_id}`)} className="flex flex-row w-[50%] h-[100%] shadow-md rounded-md ml-[10px] border-gray-200 border-[1px] overflow-hidden hover:-translate-y-0 hover:scale-110 hover:bg-white duration-100 active:scale-100">
                            <div className="flex flex-col w-[40%] h-full items-center justify-center">
                                <span className="text-md">{stateRankHammer[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id).product_name : ""}</span>
                                <span className="text-md text-red-700">{stateRankHammer[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id).category_name : ""}</span>
                                <span className="text-md font-bold">Rp{stateRankHammer[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id).product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""}</span>
                            </div>
                            <img className="w-[60%] h-full" src={stateRankHammer[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankHammer[0].product_id).product_image : ""} alt="" />
                        </button>
                    </div>
                    <div className="flex flex-row w-[100%] h-[100%] pt-[10px]">
                        <button onClick={() => navigate(`/detail/${stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id).product_id}`)} className="flex flex-row w-[50%] h-[100%] shadow-md rounded-md mr-[10px] border-gray-200 border-[1px] overflow-hidden hover:-translate-y-0 hover:scale-110 hover:bg-white duration-100 active:scale-100">
                            <div className="flex flex-col w-[40%] h-full items-center justify-center">
                                <span className="text-md">{stateRankDrill[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id).product_name : ""}</span>
                                <span className="text-md text-red-700">{stateRankDrill[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id).category_name : ""}</span>
                                <span className="text-md font-bold">Rp{stateRankDrill[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id).product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""}</span>
                            </div>
                            <img className="w-[60%] h-full" src={stateRankDrill[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankDrill[0].product_id).product_image : ""} alt="" />
                        </button>
                        <button onClick={() => navigate(`/detail/${stateRankWrench[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id).product_id}`)} className="flex flex-row w-[50%] h-[100%] shadow-md rounded-md ml-[10px] border-gray-200 border-[1px] overflow-hidden hover:-translate-y-0 hover:scale-110 hover:bg-white duration-100 active:scale-100">
                            <div className="flex flex-col w-[40%] h-full items-center justify-center">
                            <span className="text-md">{stateRankGrinder[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id).product_name : ""}</span>
                                <span className="text-md text-red-700">{stateRankGrinder[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id).category_name : ""}</span>
                                <span className="text-md font-bold">Rp{stateRankGrinder[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id).product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""}</span>
                            </div>
                            <img className="w-[60%] h-full" src={stateRankGrinder[0] && stateProducts && stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id) ? stateProducts.find((item) => item.product_id == stateRankGrinder[0].product_id).product_image : ""} alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full h-[90px] px-[30px]">
                <div className="flex flex-row w-[20%] h-full mr-[20px] rounded-md overflow-hidden border border-gray-200 border-[1px] shadow-md">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[60px] h-[60px] text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-lg">Affordable Price</span>
                    </div>
                </div>
                <div className="flex flex-row w-[20%] h-full mr-[20px] rounded-md overflow-hidden border border-gray-200 border-[1px] shadow-md">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[60px] h-[60px] text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-lg">Various Types</span>
                    </div>
                </div>
                <div className="flex flex-row w-[20%] h-full mr-[20px] rounded-md overflow-hidden border border-gray-200 border-[1px] shadow-md">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[60px] h-[60px] text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-lg">Easy to Use</span>
                    </div>
                </div>
                <div className="flex flex-row w-[20%] h-full mr-[20px] rounded-md overflow-hidden border border-gray-200 border-[1px] shadow-md">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[60px] h-[60px] text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-lg">Official Brand</span>
                    </div>
                </div>
                <div className="flex flex-row w-[20%] h-full rounded-md overflow-hidden border border-gray-200 border-[1px] shadow-md">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[60px] h-[60px] text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-lg">100% Original</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-[200px]">
                <div className="flex flex-row w-full h-[100px] items-center justify-center">
                    <div className="w-[50%]">
                        <hr className="border-1 border-gray-200" />
                    </div>
                    <div className="flex w-[300px] items-center justify-center">
                        <h1 className="text-2xl font-semibold">See Our Products</h1>
                    </div>
                    <div className="w-[50%]">
                        <hr className="border-1 border-gray-200" />
                    </div>
                </div>
                <div className="flex flex-row w-full h-[85px] px-[30px] justify-center">
                    {stateCategories.map((category) => (
                        <button key={category.category_id} onClick={() => setSelectedCategory(category.category_id)} className="flex flex-row w-[20%] h-full mx-[10px] rounded-md overflow-hidden border border-gray-200 border-[1px] shadow-md hover:-translate-y-0 hover:scale-110 hover:bg-white duration-100 active:scale-100">
                            <div className="flex w-[30%] h-full items-center justify-center">
                                <img
                                    className="w-full h-full"
                                    src={catImg.find((item) => item.id === category.category_id)?.img || ""}
                                    alt=""
                                    title={catImg.find((item) => item.id === category.category_id)?.by || ""} />
                            </div>
                            <div className="flex w-[70%] h-full items-center justify-center">
                                <span className="text-lg">{category.category_name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full h-[390px]">
                <div className="flex flex-row w-full h-[15%] items-center justify-center">
                    <div className="w-[30%] pr-[80px]">
                        <hr className="border-1 border-gray-200" />
                    </div>
                    <div className="flex flex-row px-[15px] py-[5px] shadow-md rounded-md w-[40%] border-gray-100 border-[1px] items-center">
                        <svg className="w-[18px] h-[18px] text-white mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="firebrick" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <input type="text" placeholder="Search Products" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="flex bg-transparent w-full border-0 text-dark outline-none" />
                    </div>
                    <div className="w-[30%] pl-[80px]">
                        <hr className="border-1 border-gray-200" />
                    </div>
                </div>
                <div className="flex flex-row w-full h-[85%] items-center px-[20px] pb-[10px] overflow-auto">
                    {filteredProducts && filteredProducts.map((item) => (
                        <div className="flex flex-col w-[200px] h-[280px] rounded-md mx-[10px] border-gray-100 border-[1px] shadow-md">
                            <div className="w-[199px] h-[50%] border-b-[1px]">
                                <img className="w-full h-full object-fill rounded-t-lg" src={item.product_image} alt="" />
                            </div>
                            <div className="flex flex-col w-full h-[30%] items-center justify-center p-[10px]">
                                <span className="min-w-0 max-w-[85%] text-lg font-bold truncate">Rp{item.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                <span className="min-w-0 max-w-[85%] text-sm truncate">{item.category_name}</span>
                                <span className="min-w-0 max-w-[85%] text-xs truncate">{item.product_name}</span>
                            </div>
                            <div className="flex w-full h-[20%] items-center justify-center p-[10px]">
                                <button onClick={() => navigate(`/detail/${item.product_id}`)} className="w-full h-full bg-red-700 hover:bg-red-600 active:bg-orange-600 active:scale-95 text-white font-bold rounded" >
                                    Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex bg-gray-200 w-full h-[70px] items-center justify-center border-t-[2px]">
                <div className="flex flex-row w-[20%] h-full mx-[20px] overflow-hidden">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[40px] h-[40px] text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-md">+62 341 4359521</span>
                    </div>
                </div>
                <div className="flex flex-row w-[20%] h-full mx-[20px] overflow-hidden">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[40px] h-[40px] text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-md">Jl. Kalpataru 77 A. Jatimulyo , Lowokwaru - Malang</span>
                    </div>
                </div>
                <div className="flex flex-row w-[20%] h-full mx-[20px] overflow-hidden">
                    <div className="flex w-[30%] h-full items-center justify-center">
                        <svg class="w-[40px] h-[40px] text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1" />
                        </svg>
                    </div>
                    <div className="flex w-[70%] h-full items-center">
                        <span className="text-md">cs@trindojaya.com</span>
                    </div>
                </div>
            </div>
            <div className="flex bg-gray-800 w-full h-[30px] items-center justify-center">
                <div className="flex w-fit h-full items-center justify-center">
                    <span className="text-sm text-white">Copyright © 2024 HM - Trindo Jaya</span>
                </div>
            </div>
        </div>
    );
}