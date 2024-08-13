import * as Babel from '@types/babel__standalone';
import * as React from '@types/react';
import { TransformOptions } from "@babel/core";
import React, { FunctionComponent, FC, PropsWithChildren } from 'react';
import { TransformOptions } from "@babel/core";
export interface IStringToReactApi {
    update: (template: string, babelOptions: TransformOptions) => void;
    getComponent: () => FC<PropsWithChildren<{}>>;
    [x: string]: any;
}
export type TReact = typeof React;
export type TBabel = typeof Babel;
export interface StringToReactComponentProps {
    data?: object,
    babelOptions?: TransformOptions,
    children?: string,
}
