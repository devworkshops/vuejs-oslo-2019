import { shallowMount } from "@vue/test-utils";
import InvalidFeedback from "@/components/InvalidFeedback.vue";

describe("InvalidFeedback.vue", () => {
  it("Failed isUnique shows message", () => {
    const wrapper = shallowMount(InvalidFeedback, {
      propsData: {
        field: "Name",
        model: {
          isUnique: false
        }
      }
    });
    expect(wrapper.text()).toMatch("already exists");
  });
});
