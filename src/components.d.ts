/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@ionic/core';
import 'ionicons';


export namespace Components {

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface AppTextarea {
    'btText': string;
    'id': string;
    'placeholder': string;
    'type': string;
    'uid': string;
  }
  interface AppTextareaAttributes extends StencilHTMLAttributes {
    'btText'?: string;
    'id'?: string;
    'placeholder'?: string;
    'type'?: string;
    'uid'?: string;
  }

  interface AuthButton {}
  interface AuthButtonAttributes extends StencilHTMLAttributes {}

  interface UserProfile {
    'image': string;
    'message': string;
    'name': string;
    'size': number;
  }
  interface UserProfileAttributes extends StencilHTMLAttributes {
    'image'?: string;
    'message'?: string;
    'name'?: string;
    'size'?: number;
  }

  interface PageHome {}
  interface PageHomeAttributes extends StencilHTMLAttributes {}

  interface PageMessageAnswer {
    'id': string;
    'uid': string;
  }
  interface PageMessageAnswerAttributes extends StencilHTMLAttributes {
    'id'?: string;
    'uid'?: string;
  }

  interface PageTabs {}
  interface PageTabsAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'AppRoot': Components.AppRoot;
    'AppTextarea': Components.AppTextarea;
    'AuthButton': Components.AuthButton;
    'UserProfile': Components.UserProfile;
    'PageHome': Components.PageHome;
    'PageMessageAnswer': Components.PageMessageAnswer;
    'PageTabs': Components.PageTabs;
  }

  interface StencilIntrinsicElements {
    'app-root': Components.AppRootAttributes;
    'app-textarea': Components.AppTextareaAttributes;
    'auth-button': Components.AuthButtonAttributes;
    'user-profile': Components.UserProfileAttributes;
    'page-home': Components.PageHomeAttributes;
    'page-message-answer': Components.PageMessageAnswerAttributes;
    'page-tabs': Components.PageTabsAttributes;
  }


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLAppTextareaElement extends Components.AppTextarea, HTMLStencilElement {}
  var HTMLAppTextareaElement: {
    prototype: HTMLAppTextareaElement;
    new (): HTMLAppTextareaElement;
  };

  interface HTMLAuthButtonElement extends Components.AuthButton, HTMLStencilElement {}
  var HTMLAuthButtonElement: {
    prototype: HTMLAuthButtonElement;
    new (): HTMLAuthButtonElement;
  };

  interface HTMLUserProfileElement extends Components.UserProfile, HTMLStencilElement {}
  var HTMLUserProfileElement: {
    prototype: HTMLUserProfileElement;
    new (): HTMLUserProfileElement;
  };

  interface HTMLPageHomeElement extends Components.PageHome, HTMLStencilElement {}
  var HTMLPageHomeElement: {
    prototype: HTMLPageHomeElement;
    new (): HTMLPageHomeElement;
  };

  interface HTMLPageMessageAnswerElement extends Components.PageMessageAnswer, HTMLStencilElement {}
  var HTMLPageMessageAnswerElement: {
    prototype: HTMLPageMessageAnswerElement;
    new (): HTMLPageMessageAnswerElement;
  };

  interface HTMLPageTabsElement extends Components.PageTabs, HTMLStencilElement {}
  var HTMLPageTabsElement: {
    prototype: HTMLPageTabsElement;
    new (): HTMLPageTabsElement;
  };

  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement
    'app-textarea': HTMLAppTextareaElement
    'auth-button': HTMLAuthButtonElement
    'user-profile': HTMLUserProfileElement
    'page-home': HTMLPageHomeElement
    'page-message-answer': HTMLPageMessageAnswerElement
    'page-tabs': HTMLPageTabsElement
  }

  interface ElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'app-textarea': HTMLAppTextareaElement;
    'auth-button': HTMLAuthButtonElement;
    'user-profile': HTMLUserProfileElement;
    'page-home': HTMLPageHomeElement;
    'page-message-answer': HTMLPageMessageAnswerElement;
    'page-tabs': HTMLPageTabsElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
