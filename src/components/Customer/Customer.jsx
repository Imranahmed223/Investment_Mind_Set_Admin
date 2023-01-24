import React from "react";

import "./Customer.scss";
const Customer = () => {
  const Button = ({ type }) => {
    return <button className={"customerLgButton " + type}>{type}</button>;
  };

  return (
    <>
      <div className="customer">
        <div className="customer-modal">
          <div className="customerLg">
            <h3 className="customerLgTitle">Latest transactions</h3>
            <table className="customerLgTable">
              <tr className="customerLgTr">
                <th className="customerLgTh">Customer</th>
                <th className="customerLgTh">Date</th>
                <th className="customerLgTh">Amount</th>
                <th className="customerLgTh">Status</th>
              </tr>
              <tr className="customerLgTr">
                <td className="customerLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="customerLgImg"
                  />
                  <span className="customerLgName">Bilal</span>
                </td>
                <td className="customerLgDate">2 Jun 2021</td>
                <td className="customerLgAmount">$122.00</td>
                <td className="customerLgStatus">
                  <Button type="Approved" />
                </td>
              </tr>
              <tr className="customerLgTr">
                <td className="customerLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="customerLgImg"
                  />
                  <span className="customerLgName">Bilal</span>
                </td>
                <td className="customerLgDate">2 Jun 2021</td>
                <td className="customerLgAmount">$122.00</td>
                <td className="customerLgStatus">
                  <Button type="Declined" />
                </td>
              </tr>
              <tr className="customerLgTr">
                <td className="customerLgUser">
                  <img
                    src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt=""
                    className="customerLgImg"
                  />
                  <span className="customerLgName">Bilal</span>
                </td>
                <td className="customerLgDate">2 Jun 2021</td>
                <td className="customerLgAmount">$122.00</td>
                <td className="customerLgStatus">
                  <Button type="Pending" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
