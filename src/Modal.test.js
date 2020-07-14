import React from "react";
import { shallow } from "enzyme";
import Modal from "./Modal"

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					name: ["breedName", "breedName", "breedName", "breedName", "breedName", "breedName"],
				},
			]),
	})
);

describe("When the modal is open", () => {
    const wrapper = shallow(<Modal />);

    it("should fetch the api", () => {
        expect(fetch).toHaveBeenCalledWith("https://api.thecatapi.com/v1/breeds");

        expect(wrapper.state().breeds).toStrictEqual(["breedName", "breedName", "breedName", "breedName", "breedName", "breedName"]);
    })

    it("should display a close modal button", () => {
      expect(wrapper.find('.js-close-modal-button').length).toBe(1);
      expect(wrapper.find('.js-close-modal-button').text()).toBe("close");
    })

    it("should display a drop down menu to choose a cat breed", () => {
      expect(wrapper.find('.js-cat-breed-drop-down-menu').length).toBe(1);
    })
});