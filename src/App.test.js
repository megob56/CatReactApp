import React from "react";
import { shallow } from "enzyme";
import App from "./App";

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
          name: "catBreed",
				},
			]),
	})
);

describe("When running the app", () => {
	const wrapper = shallow(<App />);
	
	it("should render the App", () => {
		expect(wrapper.length).toBe(1); 
	});

	it("should display a open modal button", () => {
		expect(wrapper.find(".js-open-modal-button").type()).toBe("button");
		expect(wrapper.find(".js-open-modal-button").text()).toBe("Open");
	});

	it("should not display the cat modal", () => {
		expect(wrapper.state().isModalOpen).toBe(false);
  });
  
  describe("When clicking the open modal button", () => {
    beforeAll(() => {
      wrapper.find('.js-open-modal-button').simulate('click')
    });

    it("should open the cat modal", () => {
      expect(wrapper.state().isModalOpen).toBe(true);
    });

    it("should make an api call", () => {
      expect(fetch).toHaveBeenCalledWith("https://api.thecatapi.com/v1/breeds");
    });

    it("should display a close button, heading & a drop down list", () => {
      expect(wrapper.find('.js-close-modal-button').length).toBe(1);
      expect(wrapper.find('.js-close-modal-button').text()).toBe("Close");
      expect(wrapper.find('.js-select-cat-breed-menu').length).toBe(1);
      expect(wrapper.find('.js-modal-title').text()).toBe("Choose Your Favorite Cat Breed");
    });

  });

  describe("When clicking the close modal button", () => {
    beforeAll(() => {
      wrapper.setState({isModalOpen: true});
      wrapper.find('.js-close-modal-button').simulate('click');
    });

    it("should close the modal", () => {
      expect(wrapper.state().isModalOpen).toBe(false);
    });

    it("should call the api", () => {
      expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/breeds/search?q=`);
      expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/images/search?breed_ids=undefined`)
    });

    it("should return an image of a cat", () => {
      expect(wrapper.find('.js-image-of-cat').length).toBe(1);
    });
  }); 


});
