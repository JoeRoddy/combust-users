import userStore from "../../stores/UserStore";
import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import Icon from "../reusable/Icon";
import { firebaseConfig } from "../../.combust/config";
import { uploadDocument } from "../../db/FileDb";
import "./styles/Users.scss";

@observer
export default class Profile extends Component {
  state = {};

  openConversationWithUser = userId => {
    alert("combust install chat");
  };

  followUser(userId) {
    alert("combust install followers");
  }

  sendFriendRequest(userId) {
    alert("combust install friends");
  }

  uploadProfilePicture = (e, user) => {
    if (!firebaseConfig.storageBucket) {
      return prompt(
        `Ensure you've enabled storage first, then re-execute:\n combust conbigure ${
          firebaseConfig.projectId
        }`,
        `https://console.firebase.google.com/project/${
          firebaseConfig.projectId
        }/storage/files`
      );
    }

    const profilePic = this.refs.profilePic.files[0];
    uploadDocument(profilePic, "images/", (err, res) => {
      if (err) return console.error(err);
      user.iconUrl = res.url;
      user.save();
    });
  };

  render() {
    const userId = this.props.match.params.userId;
    const user = userStore.getUserById(userId);
    const isMyProfile = userId === userStore.userId;

    if (!user) {
      return <span />;
    }

    return (
      <div className="Profile">
        <div>
          <div>
            <div
              className="uk-background-cover uk-height-medium uk-panel"
              style={{
                backgroundImage:
                  'url("https://static.pexels.com/photos/459225/pexels-photo-459225.jpeg")'
              }}
            >
              <div className="uk-text-large profile-name uk-text-white">
                {user.displayName}
              </div>
            </div>
            <div className="uk-panel uk-flex uk-flex-center uk-flex-middle">
              <div className="uk-position-bottom uk-card-primary uk-flex uk-flex-left uk-padding-small uk-box-shadow-large">
                {userId && !isMyProfile ? (
                  <ul className="uk-iconnav nav-btns">
                    <li className="profile-nav-btn">
                      <Icon type="comment" />
                      <span
                        className="uk-link"
                        onClick={e => {
                          this.openConversationWithUser(userId);
                        }}
                      >
                        Send Message
                      </span>
                    </li>
                    <li className="profile-nav-btn">
                      <Icon type="user" />
                      <span
                        onClick={e => {
                          this.sendFriendRequest(userId);
                        }}
                        className="uk-link"
                      >
                        Friend Request
                      </span>
                    </li>{" "}
                    <li className="profile-nav-btn">
                      <Icon type="star" />
                      <span
                        onClick={e => {
                          this.followUser(userId);
                        }}
                        className="uk-link"
                      >
                        Follow
                      </span>
                    </li>
                  </ul>
                ) : (
                  <ul className="uk-iconnav nav-btns">
                    <li className="profile-nav-btn">
                      <label>
                        <input
                          onChange={e => this.uploadProfilePicture(e, user)}
                          type="file"
                          ref="profilePic"
                          style={{ display: "none" }}
                        />

                        <Icon type="image" />
                        <span className="uk-link">Change Avatar</span>
                      </label>
                    </li>
                    <li className="profile-nav-btn">
                      <Icon type="file-edit" />
                      <Link to="/updateUser">
                        <span className="uk-link">Update Info</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="ProfilePic uk-position-bottom-left uk-margin-small-left uk-margin-small-bottom">
                {user.iconUrl && (
                  <div className="uk-inline-clip uk-transition-toggle">
                    <label>
                      <img src={user.iconUrl} alt="" />
                      {isMyProfile && (
                        <div className="uk-position-center uk-light profile-uploadIcon">
                          <span
                            className="uk-transition-fade"
                            uk-icon="icon: plus; ratio: 2"
                          />
                        </div>
                      )}
                      <input
                        onChange={e => this.uploadProfilePicture(e, user)}
                        type="file"
                        ref="profilePic"
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="uk-background-muted uk-flex uk-flex-center"
            uk-height-viewport="expand: true"
          >
            <div
              className="ProfileContent uk-grid-collapse uk-width-auto uk-child-width-1-2@s uk-flex-left"
              uk-grid="true"
            >
              <div className="uk-padding-large uk-background-muted">
                <ExamplePosts user={user} />
              </div>
              <div className="uk-padding-large uk-background-default">
                <h1>About me</h1>
                {[1, 2, 3, 4].map(i => {
                  return (
                    <p key={i}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ExamplePosts = ({ user }) => (
  <div className="ActivityPosts uk-flex uk-flex-top uk-flex-wrap">
    {[0, 1, 2, 4, 5, 6, 7].map(i => {
      return (
        <div
          key={i}
          className="ActivityPost uk-card uk-card-default uk-width-1@m uk-margin-bottom"
        >
          <div className="uk-card-header">
            <div className="uk-grid-small uk-flex-middle" uk-grid="true">
              <div className="uk-width-auto">
                {user &&
                  user.iconUrl && (
                    <img
                      src={user.iconUrl}
                      className="uk-border-circle"
                      width="40"
                      height="40"
                      alt="User Avatar"
                    />
                  )}
              </div>
              <div className="uk-width-expand">
                <h3 className="uk-card-title uk-margin-remove-bottom">Post</h3>
                <p className="uk-text-meta uk-margin-remove-top">
                  <time dateTime="2017-04-01T19:00">April 01, 2017</time>
                </p>
              </div>
            </div>
          </div>
          <div className="uk-card-body">
            <p>
              Run <code>combust install posts</code> to start creating posts!
            </p>
          </div>
          <div className="uk-card-footer">
            <a className="uk-button uk-button-text">Read more</a>
          </div>
        </div>
      );
    })}
  </div>
);
