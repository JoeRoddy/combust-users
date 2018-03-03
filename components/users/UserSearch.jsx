import React, { Component } from "react";
import { observer } from "mobx-react";

import userSearchDb from "../../db/UserSearchDb";
import Avatar from "../reusable/Avatar";
import "./styles/Users.scss";

@observer
export default class UserSearch extends Component {
  state = {
    results: [],
    query: ""
  };

  handleSearch = e => {
    let query = e.target.value;
    let results = userSearchDb.searchByField(query, "displayName");
    this.setState({ results, query });
  };

  openProfile = user => {
    this.setState({ query: "", results: [] });
    this.props.history.push("/profile/" + user.id);
  };

  render() {
    return (
      <div className="UserSearch">
        <form className="uk-search uk-search-default">
          <span uk-search-icon="true" uk-icon="icon: search" />
          <input
            className="uk-search-input"
            type="search"
            value={this.state.query}
            placeholder="Search for users.."
            onChange={this.handleSearch}
            results={5}
          />
        </form>
        {this.state.results.length > 0 && (
          <div className="uk-card uk-card-default uk-card-body searchResults">
            {this.state.results.map((user, i) => {
              debugger;
              return (
                <div key={i}>
                  <div
                    onClick={e => {
                      this.openProfile(user);
                    }}
                    className="userSearch-result uk-flex uk-flex-middle uk-text-truncate"
                  >
                    <Avatar src={user.iconUrl} height={30} />
                    {user.displayName}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {this.state.query !== "" && (
          <span
            className="onClickOutside"
            onClick={e => {
              this.setState({ results: [], query: "" });
            }}
          />
        )}
      </div>
    );
  }
}
