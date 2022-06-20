import React from "react";
import Router from "next/router";
import authApi from "./api/authApi";
import userApi from "./api/userApi";

export interface IProps {
  user: any,
}
export default function withAuth(
  BaseComponent,
  { loginRequired = true, logoutRequired = false } = {}
) {
  class App extends React.Component<IProps> {
    // Using getInitialProps() insteads of getStaticProps() or getServerSideProps()
    // because this is High Order Component for both Static and Server Side Generation
    static async getInitialProps(ctx) {
      let props: {};
      let user = null;
      const compProps = {};
      let resp;

      // If withAuth HOC is called on the browser => ctx.req = undefined
      if (authApi.isAuthenticated()) {
        resp = await userApi.fetchProfile();
      }

      // If withAuth HOC is called on the browser => ctx.req is availale
      if (
        ctx.req &&
        ctx.req.headers.cookie &&
        ctx.req.headers.cookie.split("=")[1]
      ) {
        resp = await userApi.fetchProfile(ctx.req.headers.cookie.split("=")[1]);
      }

      if (resp && resp.success) {
        user = resp.response.user;
      }

      if (BaseComponent.getInitialProps) {
        Object.assign(
          compProps,
          (await BaseComponent.getInitialProps(ctx)) || {}
        );
      }
      props = { ...compProps, user };
      return props;
    }

    componentDidMount() {
      const { user } = this.props;
      if (loginRequired && !logoutRequired && !user) {
        Router.push("/auth/login");
        return;
      }

      if (logoutRequired && user) {
        Router.push("/dashboard");
      }
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      return (
        <>
          <BaseComponent {...this.props} />
        </>
      );
    }
  }



  return App;
}
