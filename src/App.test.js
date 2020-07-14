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

  describe("When the modal is closed after selecting a cat breed", () => {
    beforeAll(() => {
      wrapper.setState({isModalOpen: true});
      wrapper.setState({breedId: "CAT"})
			wrapper.find(".js-close-modal-button").simulate("click");
    });
    
    it("should close the modal", () => {
      expect(wrapper.state().isModalOpen).toBe(false);
    })

    it("should display an image of a cat", () => {
      expect(wrapper.find("js-cat-image").length).toBe(1);
    })

    it("should display an image of a cat of the selected breed", () => {
      expect(wrapper.find("js-cat-image").prop("src")).toBe("https://api.thecatapi.com/images/search?breed_id=CAT");
    })
   
  });

});
