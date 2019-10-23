import React, { Component } from "react";
import Test from './test/test';
class Hello extends Component {

  private support: string[] = [
    'react',
    'node',
    'koa',
    'typescript',
    'tslint',
    'webpack',
    'rollup',
    'babel',
    'jest',
    'prettier',
    'cicd',
    'font',
    'image',
    'scss'
  ];

  public render() {
    return (
      <div className="container">
        <img
          style={{
            height: 200,
            textAlign: 'center',
            width: 200,
          }}
        />
        <Test />
        <h1 className="title">Hello webo cli.</h1>
        <p>
          {
            this.support.map((item) => {
              return (
                <span key={item} className={`iconfont icon-${item}`}/>
              )
            })
          }
        </p>
      </div>
    );
  }
}

export default Hello;

