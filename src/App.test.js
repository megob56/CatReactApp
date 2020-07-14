import React from "react";
import { shallow } from "enzyme";
import App from "./App";

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					name: "breedName",
				},
			]),
	})
);

describe("when running the app", () => {
  const wrapper = shallow(<App />);
  
  it("should render the app", () => {
    expect(wrapper.length).toBe(1);
  })

  it("should render display an open modal button", () => {
    expect(wrapper.find('.js-open-modal-button').length).toBe(1);
    expect(wrapper.find('.js-open-modal-button').text()).toBe("Open");
  })

  it("should not display the modal", () => {
    expect(wrapper.state().isModalOpen).toBe(false)
  })

  describe("When the modal is opened by clicking the button", () => {
    beforeAll(() => {
      wrapper.find('.js-open-modal-button').simulate("click");
    });
    
    it("should display a the modal", () => {
      expect(wrapper.state().isModalOpen).toBe(true);
    })
   
  });

});
