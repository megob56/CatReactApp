import React from "react";
import { shallow } from "enzyme";
import App from "./App";

global.fetch = jest.fn(() => "default")
  .mockImplementationOnce(() => Promise.resolve({
		json: () =>
			Promise.resolve([
				{
          name: "catBreed",
				},
			]),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "breedID",
        },
      ]),
  })) 
  .mockImplementationOnce(() => Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          url: "catImageURL",
        },
      ]),
  }))
	


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
      wrapper.find('.js-open-modal-button').simulate('click');
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
      expect(wrapper.state().breeds).toStrictEqual(["catBreed"]);
    });

  });

  describe("When clicking the close modal button after selecting a cat", () => {
    beforeAll(() => {
      wrapper.setState({isModalOpen: true});
      wrapper.setState({selectedBreed: "test"}); 
      wrapper.find('.js-close-modal-button').simulate('click');
    });

    it("should close the modal", () => {
      expect(wrapper.state().isModalOpen).toBe(false);
    });

    it("should call the api", () => {
      expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/breeds/search?q=test`);
      expect(wrapper.state().breedId).toBe("breedID");
      expect(fetch).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/images/search?breed_ids=breedID`);
    });

    it("should return an image of a cat", () => {
      expect(wrapper.find('.js-image-of-cat').length).toBe(1);
      expect(wrapper.state().catImage).toBe("catImageURL");
    });
  }); 


});
