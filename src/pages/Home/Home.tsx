import "./Home.scss"

const HomePage = () => {
    return (
        <div className="container">
            <div className="innerContainer">
                <div className="left">
                    <div className="titleContainer">
                        <h4>Calculate Your Salary</h4>
                        <div className="iconContainer">
                            <img src="./reset.png" alt="reset" />
                            <span>Reset</span>
                        </div>

                    </div>

                    <div className="detailContainer">
                        <div className="detail">
                            <h6>Basic Salary</h6>
                            <input type='text' value="150,000" />
                        </div>

                        <div className="detail">
                            <h6>Earnings</h6>
                            <p>Allowance, Fixed Allowance, Bonus and etc.</p>

                            <div className="innerDetailContainer">
                                <input type="text" value="Travel" />
                                <input type="text" value="10,000" />
                                <div className="buttonGroup">
                                    <button>
                                        <img src="./clear.png" alt="" />
                                    </button>

                                    <input type='checkbox' />
                                    <span>EPF/ETF</span>
                                </div>


                            </div>
                            <div className="innerDetailContainer">
                                <input type="text" placeholder="Pay Details (Title)" />
                                <input type="text" placeholder="Amount" />
                                <div className="buttonGroup">
                                    <button>
                                        <img src="./clear.png" alt="" />
                                    </button>

                                    <input type='checkbox' />
                                    <span>EPF/ETF</span>
                                </div>


                            </div>


                            <div className="addContainer">
                                <button> <img src="./Vector.png" alt="" /></button>
                                <h6>Add New Allowance</h6>
                            </div>


                        </div>
                        <div className="detail">
                            <h6>Deductions</h6>
                            <p>Salary Advances, Loan Deductions and all</p>

                            <div className="innerDetailContainer">
                                <input type="text" value="No Pay" />
                                <input type="text" value="8,000.00" />
                                <div className="buttonGroup">
                                    <button>
                                        <img src="./clear.png" alt="" />
                                    </button>
                                </div>


                            </div>
                            <div className="addContainer">
                                <button> <img src="./Vector.png" alt="" /></button>
                                <h6>Add New Allowance</h6>
                            </div>


                        </div>

                    </div>
                </div>
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
                            <h6>150,000.00</h6>
                        </div>
                        <div className="innerItemContainer">
                            <h6>Gross Earnings</h6>
                            <h6>160,000.00</h6>
                        </div>
                        <div className="innerItemContainer">
                            <h6>Gross Deduction</h6>
                            <h6>- 8,000.00</h6>
                        </div>
                        <div className="innerItemContainer">
                            <h6>Employee EPF (8%)</h6>
                            <h6>- 12,160.00</h6>
                        </div>
                        <div className="innerItemContainer">
                            <h6>APIT</h6>
                            <h6>- 3,740.00</h6>
                        </div>


                        <div className="innerItemContainer">
                            <h6>Net Salary (Take Home)</h6>
                            <h6>146,100.00</h6>
                        </div>

                        <div className="innerItemContainer">
                            <h6>Contribution from the Employer</h6>

                        </div>
                        <div className="innerItemContainer">
                            <h6>Employeer EPF (12%)</h6>
                            <h6>- 3,740.00</h6>
                        </div>
                        <div className="innerItemContainer">
                            <h6>Employeer ETF (3%)</h6>
                            <h6>- 3,740.00</h6>
                        </div>
                        <div className="innerItemContainer">
                            <h6>CTC (Cost to Company)</h6>
                            <h6>- 3,740.00</h6>
                        </div>



                    </div>




                </div>
            </div>
        </div>
    )
}

export default HomePage



