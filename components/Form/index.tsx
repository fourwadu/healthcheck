import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Label from "./Label";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

import { version } from "../../package.json";

const Form = () => {
  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      vaccinated: false,
      email: "",
      name: "",
    },
    onSubmit: async (values) => {
      const isVaccinated = values.vaccinated ? { Answer4: 0 } : {};
      const response = await axios.post("api/submit", {
        Type: "G",
        isStudent: 1,
        FirstName: values.name.split(" ")[0],
        LastName: values.name.split(" ", 2)[1],
        Email: values.email,
        State: "NY",
        Location: "M692",
        Floor: 1,
        Answer1: 0,
        Answer2: 0,
        Answer3: 0,
        _RequestVerificationToken: "https://github.com/fourwadu/healthcheck@" + version,
        ...isVaccinated,
      });
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      if (response.data.success) {
        window.location.href = "/success";
      } else {
        console.log(response.data);
        /* eslint-disable @typescript-eslint/no-unsafe-call */
        setErr(response.data.message || response.data.errors.join(", "));
      }
    },
  });

  return (
    <div className="flex flex-col h-full noSelect">
      {err ? <div className="text-red text-xs h-4">{err}</div> : null}
      <div>
        <Label text="Your first and last name" />
        <Input
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div>
        <Label text="Your school email" />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div className="flex flex-col">
        <Label text="Are you vaccinated?" />
        <Checkbox
          name="vaccinated"
          onChange={formik.handleChange}
          checked={formik.values.vaccinated}
          className="mb-3"
        />
      </div>
      <Button onClick={formik.submitForm} className="font-bold mt-auto">
        Submit
      </Button>
      <div className="text-xs font-medium text-gray-500 mt-2">
        *Please only fill this form if you have are aware of the questions on the original form and
        are safe to attend school.
      </div>
    </div>
  );
};

export default Form;
