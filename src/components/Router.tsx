import React from "react";
import { Switch, Route, Redirect } from "wouter";
import { CatList } from "./CatList";
import { Upload } from "./Upload";

export const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/">
        <CatList />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
