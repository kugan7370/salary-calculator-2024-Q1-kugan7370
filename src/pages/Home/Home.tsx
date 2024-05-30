import { ChangeEvent, useEffect, useState } from "react";
import "./Home.scss"
import TitleContainer from "../../components/TitleContainer";
import AllowanceInput from "../../components/AllowanceInput";
import DeductionInput from "../../components/DeductionInput";
import SalarySummary from "../../components/SalarySummary";
import { useDispatch, useSelector } from "react-redux";
import { addAllowance, removeAllowance, resetAllowances, updateAllowance } from "../../features/allowancesSlice";
import { addDeduction, removeDeduction, resetDeducations, updateDeduction } from "../../features/deductionsSlice";
import { resetBasicSalary, updateBasicSalary } from "../../features/basicSalarySlice";
import { RootState } from "../../store/store";



const HomePage: React.FC = () => {

    const dispatch = useDispatch();

    const allowances = useSelector((state: RootState) => state.allowances);
    const deductions = useSelector((state: RootState) => state.deductions);
    const basicSalary = useSelector((state: RootState) => state.basicSalary);


    const [totalAllowance, setTotalAllowance] = useState<number>(0);


    const handleChangBasicSalary = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(updateBasicSalary(value));
    };

    const handleAllowanceChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value, type, checked } = e.target;
        dispatch(updateAllowance({ id, key: name, value: type === 'checkbox' ? checked : value }));
    };

    const handleDeductionChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target;
        dispatch(updateDeduction({ id, key: name, value }));
    };


    const handleAddAllowance = () => {
        dispatch(addAllowance());

    };

    const handleAddDeduction = () => {
        dispatch(addDeduction());
    };

    const handleRemoveAllowance = (id: number) => {
        dispatch(removeAllowance(id));
    };

    const handleRemoveDeduction = (id: number) => {
        dispatch(removeDeduction(id));
    };

    const reset = () => {
        dispatch(resetAllowances());
        dispatch(resetDeducations());
        dispatch(resetBasicSalary());
    };

    const numberFormat = (numberWithCommas: string): number => {
        const number = parseFloat(numberWithCommas.replace(/,/g, ''));
        return isNaN(number) ? 0 : number;
    };

    useEffect(() => {
        const total = allowances.reduce((acc, allowance) => acc + numberFormat(allowance.amount), 0);
        setTotalAllowance(total);
    }, [allowances]);

    const totalEarnings = numberFormat(basicSalary) + totalAllowance;
    const totalEarningsForEPF = numberFormat(basicSalary) + allowances.filter(a => a.epf).reduce((acc, allowance) => acc + numberFormat(allowance.amount), 0);
    const grossDeduction = deductions.reduce((acc, deduction) => acc + numberFormat(deduction.amount), 0);
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = totalEarningsForEPF * 0.08;
    const employerEPF = totalEarningsForEPF * 0.12;
    const employerETF = totalEarningsForEPF * 0.03;
    const APIT = calculateTax(grossEarnings);
    const netSalary = grossEarnings - employeeEPF - APIT;
    const CTC = grossEarnings + employerEPF + employerETF;

    console.log('totalEarnings', totalEarnings);
    console.log('totalEarningsForEPF', totalEarningsForEPF);
    console.log('grossDeduction', grossDeduction);
    console.log('grossEarnings', grossEarnings);
    console.log('grossSalaryForEPF', grossSalaryForEPF);
    console.log('employeeEPF', employeeEPF);
    console.log('employerEPF', employerEPF);
    console.log('employerETF', employerETF);
    console.log('APIT', APIT);
    console.log('netSalary', netSalary);
    console.log('CTC', CTC);



    function calculateTax(grossEarnings: number): number {
        let taxPercentage: number;
        let constant: number;

        if (grossEarnings <= 100000) {
            taxPercentage = 0;
            constant = 0;
        } else if (grossEarnings <= 141667) {
            taxPercentage = 6;
            constant = 6000;
        } else if (grossEarnings <= 183333) {
            taxPercentage = 12;
            constant = 14500;
        } else if (grossEarnings <= 225000) {
            taxPercentage = 18;
            constant = 25500;
        } else if (grossEarnings <= 266667) {
            taxPercentage = 24;
            constant = 39000;
        } else if (grossEarnings <= 308333) {
            taxPercentage = 30;
            constant = 55000;
        } else {
            taxPercentage = 36;
            constant = 73500;
        }

        const tax = (grossEarnings * taxPercentage / 100) - constant;
        return Math.max(tax, 0); // Ensure tax is not negative
    }

    console.log('totalAllowance', totalAllowance);
    return (
        <div className="container">
            <div className="innerContainer">
                <div className="left">
                    <TitleContainer title="Calculate Your Salary" reset={reset} />
                    <div className="detailContainer">
                        <div className="detail">
                            <h6>Basic Salary</h6>
                            <input type='text' onChange={handleChangBasicSalary} value={basicSalary} />
                        </div>
                        <div className="detail">
                            <h6>Earnings</h6>
                            <p>Allowance, Fixed Allowance, Bonus and etc.</p>
                            {allowances.map(allowance => (
                                <AllowanceInput
                                    key={allowance.id}
                                    allowance={allowance}
                                    handleChange={handleAllowanceChange}
                                    handleRemove={handleRemoveAllowance}
                                />
                            ))}
                            <div className="addContainer" onClick={handleAddAllowance}>
                                <button >
                                    <img src="./Vector.png" alt="" />
                                </button>
                                <h6>Add New Allowance</h6>
                            </div>
                        </div>
                        <div className="detail">
                            <h6>Deductions</h6>
                            <p>Salary Advances, Loan Deductions and all</                            p>
                            {deductions.map(deduction => (
                                <DeductionInput
                                    key={deduction.id}
                                    deduction={deduction}
                                    handleChange={handleDeductionChange}
                                    handleRemove={handleRemoveDeduction}
                                />
                            ))}
                            <div className="addContainer" onClick={handleAddDeduction}>
                                <button>
                                    <img src="./Vector.png" alt="" />
                                </button>
                                <h6>Add New Deduction</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <SalarySummary
                    basicSalary={numberFormat(basicSalary)}
                    totalAllowance={totalAllowance}
                    totalEarnings={totalEarnings}
                    grossDeduction={grossDeduction}
                    employeeEPF={employeeEPF}
                    APIT={APIT}
                    netSalary={netSalary}
                    employerEPF={employerEPF}
                    employerETF={employerETF}
                    CTC={CTC}
                />
            </div>
        </div>
    );
};

export default HomePage;




