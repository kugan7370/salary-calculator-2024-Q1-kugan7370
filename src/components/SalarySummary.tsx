

interface SalarySummaryProps {
    basicSalary: number;
    totalAllowance: number;
    totalEarnings: number;
    grossDeduction: number;
    employeeEPF: number;
    APIT: number;
    netSalary: number;
    employerEPF: number;
    employerETF: number;
    CTC: number;
}

const currencyFormat = (data: number) => {
    return data.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

};



const SalarySummary: React.FC<SalarySummaryProps> = ({
    basicSalary,
    totalEarnings,
    grossDeduction,
    employeeEPF,
    APIT,
    netSalary,
    employerEPF,
    employerETF,
    CTC
}) => (
    <div className="right">
        <div className="titleContainer">
            <h4>Your salary</h4>
        </div>
        <div className="itemContainer">
            <div className="innerItemContainer">
                <h6>Items</h6>
                <h6>Amount</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Basic Salary</h6>
                <h6>{currencyFormat(basicSalary)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Gross Earnings</h6>
                <h6>{currencyFormat(totalEarnings)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Gross Deduction</h6>
                <h6>{currencyFormat(-grossDeduction)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Employee EPF (8%)</h6>
                <h6>{currencyFormat(-employeeEPF)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>APIT</h6>
                <h6>{currencyFormat(-APIT)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Net Salary (Take Home)</h6>
                <h6>{currencyFormat(netSalary)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Contribution from the Employer</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Employer EPF (12%)</h6>
                <h6>{currencyFormat(employerEPF)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>Employer ETF (3%)</h6>
                <h6>{currencyFormat(employerETF)}</h6>
            </div>
            <div className="innerItemContainer">
                <h6>CTC (Cost to Company)</h6>
                <h6>{currencyFormat(CTC)}</h6>
            </div>
        </div>
    </div>
);

export default SalarySummary;