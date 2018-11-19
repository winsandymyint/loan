import React, { Component } from "react";
import storage from "../helpers/storage";
import { Table as AntdTable, Button, Card, Row, Col } from "antd";
import WrappedNormalRepayForm from "./repayForm";
import { message as AntdMessage } from "antd";
import noop from "lodash/noop";
import Header from "./header";

const triggerMessage = (
  type,
  content = "[ no content ]",
  duration = 3,
  onClose = noop
) => AntdMessage[type](content, duration, onClose);
const success = content => triggerMessage("success", content);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: storage.get("users") ? JSON.parse(storage.get("users")) : null
    };
  }

  componentWillReceiveProps = nextProps => {
    const { history } = this.props;
    if (nextProps.user && !nextProps.user.id) {
      history.push("/login");
    }
  };

  approveLoan = record => {
    let { users } = this.state;
    record.status = "approve";
    users[users.findIndex(el => el.id === record.id)] = record;
    this.setState({ users });
    localStorage.setItem("users", JSON.stringify(users));
  };

  commitAmount = loanUser => {
    let { users } = this.state;
    users[users.findIndex(el => el.id === loanUser.id)] = loanUser;
    this.setState({ users });
    localStorage.setItem("users", JSON.stringify(users));
    success("Your weekly payment has been submitted");
  };

  renderSingleUser = () => {
    const { user } = this.props;
    const { users } = this.state;
    const foundUser = users[users.findIndex(el => el.id === user.id)];

    if (foundUser && foundUser.status === "approve") {
      return (
        <WrappedNormalRepayForm
          loanUser={foundUser}
          onSubmit={this.commitAmount}
        />
      );
    }
    return (
      <Row align="middle" justify="center" type="flex">
        <Col span={12}>
          <Card style={{ textAlign: 'center'}}>Waiting approval from admin</Card>
        </Col>
      </Row>
    );
  };

  render() {
    const { user } = this.props;
    let { users } = this.state;
    users = users? users.filter(obj => obj.role === "candidate") : "";
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: 350,
        key: "name"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Loan Type",
        dataIndex: "loanType",
        key: "loanType"
      },
      {
        title: "Loan Amount",
        dataIndex: "amount",
        key: "amount"
      },
      {
        title: "Weekly  Amount",
        key: "weeklyAmount",
        render: record => {
          if (record.status === "approve" && record.weeklyAmount) {
            return record.weeklyAmount;
          }
          return "-";
        }
      },
      {
        title: "Action",
        key: "edit",
        render: record => {
          if (record.status === "pending") {
            return (
              <Button type="primary" onClick={() => this.approveLoan(record)}>
                Approve
              </Button>
            );
          }
          return "approved";
        }
      },

    ];
    return (
      <div style={{ width: "100%" }}>
        <Header />
        <div className="layout__main">
          {user && user.role === "admin" && (
            <AntdTable
              className='user-table'
              dataSource={users}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          )}
          {user && user.role === "candidate" && this.renderSingleUser()}
        </div>
      </div>
    );
  }
}

export default Dashboard;
