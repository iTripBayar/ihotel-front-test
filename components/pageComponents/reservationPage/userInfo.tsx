import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo, Fragment } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import countryList from "react-select-country-list";
import { Session } from "next-auth";
import { Listbox, Transition, Combobox } from "@headlessui/react";
// import Select from "react-select";

interface Props {
  ver: string;
  stat: string;
  clients: {
    name: string;
    surName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  updateClients: (e: {
    name: string;
    surName: string;
    email: string;
    phone: string;
    nationality: string;
  }) => void; 
  handleSubmit: () => void;
  orderLoading: boolean;
  session: Session | null;
  country: string | null | undefined;
}
export default function UserInfo({
  ver,
  stat,
  clients,
  updateClients,
  handleSubmit,
  orderLoading,
  session,
  country,
}: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [isChecked, setIsChecked] = useState(false);
  const [additionalClients, setAdditionalClients] = useState<
    {
      name: string;
      surName: string;
      email: string;
      phone: string;
      nationality: string;
    }[]
  >([]);
  const options = useMemo(() => countryList().getData(), []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleAdditionalClients = (e: string) => {
    if (e === "add") {
      const sample = {
        name: "",
        surName: "",
        email: "",
        phone: "",
        nationality: "",
      };
      if (additionalClients?.length === 0) {
        setAdditionalClients([sample]);
      } else {
        setAdditionalClients((prev) => [...prev, sample]);
      }
    } else {
      setAdditionalClients(
        additionalClients.splice(0, additionalClients.length - 1),
      );
    }
  };

  if (ver === "mobile") {
    return (
      <div className="flex w-full flex-col gap-[16px] rounded-[20px] bg-white px-[16px] py-[12px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] sm:gap-[20px] sm:py-[16px]">
        <p className="text-[18px] font-medium leading-[18px] text-sub-text">
          {lang === "en" ? `Client's info` : "Захиалагчийн мэдээлэл"}
        </p>
        <form className="flex w-full flex-col gap-[16px]">
          {additionalClients.length > 0 && (
            <p className="font-medium">
              {lang === "en" ? "Client" : "Захиалагч"} 1
            </p>
          )}
          <input
            type="text"
            id={`name`}
            name={`name`}
            pattern="[A-Za-z]+"
            required
            onChange={(e) => {
              const value = {
                name: e.target.value,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.name}
            placeholder={lang === "en" ? "Given name" : "Нэр"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            id={`surName`}
            name={`surName`}
            pattern="[A-Za-z]+"
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: e.target.value,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.surName}
            placeholder={lang === "en" ? "Family name" : "Овог"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            id={`email`}
            name={`email`}
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: e.target.value,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.email}
            placeholder={lang === "en" ? "Email" : "И-мэйл"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <input
            type="number"
            id={`phone`}
            name={`phone`}
            pattern="[0-9]+"
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: e.target.value,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.phone}
            placeholder={lang === "en" ? "Phone number" : "Утасны дугаар"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <Select
            isRequired
            aria-label="Nationality"
            placeholder={lang === "en" ? "Nationality" : "Иргэншил"}
            // defaultSelectedKeys={[
            //   `${
            //     clients.nationality !== ""
            //       ? clients.nationality
            //       : 'Mongolia'
            //   }`,
            // ]}
            defaultSelectedKeys={[clients.nationality]}
            value={clients.nationality}
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: e.target.value,
              };
              updateClients(value);
            }}
            variant="bordered"
            size="sm"
            classNames={{
              label: "group-data-[filled=true]:-translate-y-5",
              trigger: "min-h-unit-8",
              listboxWrapper: "max-h-[300px]",
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
          >
            {options.map((index) => (
              <SelectItem key={index.label} value={index.label}>
                {index.label}
              </SelectItem>
            ))}
          </Select>
          {additionalClients.length === 0 ? (
            <button
              className="flex items-center justify-end"
              onClick={() => handleAdditionalClients("add")}
            >
              <div className="relative h-[20px] w-[20px]">
                <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                <div className="absolute left-[50%] top-[50%] h-[10px] w-[2px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
              </div>
              <p className="text-[12px] font-medium leading-[12px] text-primary-blue">
                {lang === "en"
                  ? `Add another client's info`
                  : "Нэмэлт захиалагчийн мэдээлэл оруулах"}
              </p>
            </button>
          ) : null}
        </form>
        {handleAdditionalClients.length > 0
          ? additionalClients.map((index, i) => (
              <form className="flex w-full flex-col gap-[16px]" key={i}>
                <div className="flex justify-between">
                  <p className="font-medium">
                    {lang === "en" ? "Client" : "Захиалагч"} {i + 2}
                  </p>
                  {i + 1 === additionalClients.length ? (
                    <button
                      className="flex items-center justify-end"
                      onClick={() => handleAdditionalClients("delete")}
                    >
                      <div className="relative h-[20px] w-[20px]">
                        <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                      </div>
                      <p className="text-[12px] font-medium leading-[12px] text-primary-blue">
                        {lang === "en" ? `Delete` : "Хасах"}
                      </p>
                    </button>
                  ) : null}
                </div>
                <input
                  type="text"
                  id={`name-${i}`}
                  name={`name-${i}`}
                  pattern="[A-Za-z]+"
                  required
                  onChange={(e) => {
                    if (parseInt(e.target.name.split("-")[1]) === i) {
                      setAdditionalClients((prevClients) => {
                        return prevClients.map((client, index) => {
                          if (index === i) {
                            // Update only the corresponding index's name value
                            return {
                              ...client,
                              name: e.target.value,
                            };
                          }
                          return client;
                        });
                      });
                    }
                  }}
                  // onKeyDown={(e) => {
                  //   const regex = /^[A-Za-z]+$/;
                  //   const isValid = regex.test(e.key);
                  //   if (!isValid) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  placeholder={lang === "en" ? "Given name" : "Нэр"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`surName-${i}`}
                  name={`surName-${i}`}
                  pattern="[A-Za-z]+"
                  required
                  onChange={(e) => {
                    if (parseInt(e.target.name.split("-")[1]) === i) {
                      setAdditionalClients((prevClients) => {
                        return prevClients.map((client, index) => {
                          if (index === i) {
                            // Update only the corresponding index's name value
                            return {
                              ...client,
                              surName: e.target.value,
                            };
                          }
                          return client;
                        });
                      });
                    }
                  }}
                  // onKeyDown={(e) => {
                  //   const regex = /^[A-Za-z]+$/;
                  //   const isValid = regex.test(e.key);

                  //   if (!isValid) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  placeholder={lang === "en" ? "Family name" : "Овог"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`email-${i}`}
                  name={`email-${i}`}
                  required
                  onChange={(e) => {
                    if (parseInt(e.target.name.split("-")[1]) === i) {
                      setAdditionalClients((prevClients) => {
                        return prevClients.map((client, index) => {
                          if (index === i) {
                            // Update only the corresponding index's name value
                            return {
                              ...client,
                              email: e.target.value,
                            };
                          }
                          return client;
                        });
                      });
                    }
                  }}
                  placeholder={lang === "en" ? "Email" : "И-мэйл"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`phone-${i}`}
                  name={`phone-${i}`}
                  pattern="[0-9]+"
                  required
                  // onKeyDown={(e) => {
                  //   // Allow only numeric characters (0-9)
                  //   const isNumericOrBackspace =
                  //     /^[0-9]$/.test(e.key) ||
                  //     e.key === "Backspace" ||
                  //     e.key === "Tab";
                  //   if (!isNumericOrBackspace) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  onChange={(e) => {
                    if (parseInt(e.target.name.split("-")[1]) === i) {
                      setAdditionalClients((prevClients) => {
                        return prevClients.map((client, index) => {
                          if (index === i) {
                            // Update only the corresponding index's name value
                            return {
                              ...client,
                              phone: e.target.value,
                            };
                          }
                          return client;
                        });
                      });
                    }
                  }}
                  placeholder={lang === "en" ? "Phone number" : "Утасны дугаар"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`nationality-${i}`}
                  name={`nationality-${i}`}
                  pattern="[A-Za-z]+"
                  required
                  onChange={(e) => {
                    if (parseInt(e.target.name.split("-")[1]) === i) {
                      setAdditionalClients((prevClients) => {
                        return prevClients.map((client, index) => {
                          if (index === i) {
                            // Update only the corresponding index's name value
                            return {
                              ...client,
                              nationality: e.target.value,
                            };
                          }
                          return client;
                        });
                      });
                    }
                  }}
                  placeholder={lang === "en" ? "Nationality" : "Иргэншил"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                {additionalClients.length === i + 1 ? (
                  <button
                    className="flex items-center justify-end"
                    onClick={() => handleAdditionalClients("add")}
                  >
                    <div className="relative h-[20px] w-[20px]">
                      <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                      <div className="absolute left-[50%] top-[50%] h-[10px] w-[2px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                    </div>
                    <p className="text-[12px] font-medium leading-[12px] text-primary-blue">
                      {lang === "en"
                        ? `Add another client's info`
                        : "Нэмэлт захиалагчийн мэдээлэл оруулах"}
                    </p>
                  </button>
                ) : null}
              </form>
            ))
          : null}
      </div>
    );
  } else {
    return (
      <div className="flex h-fit w-full flex-col gap-[24px] rounded-[20px] border border-black/[.15] bg-white px-[16px] py-[16px]">
        <p className="text-[18px] font-medium leading-[18px] text-sub-text">
          {lang === "en" ? `Client's info` : "Захиалагчийн мэдээлэл"}
        </p>
        <form className="flex w-full flex-col gap-[16px]">
          {additionalClients.length > 0 && (
            <p className="font-medium">
              {lang === "en" ? "Client" : "Захиалагч"} 1
            </p>
          )}
          <input
            type="text"
            id={`name`}
            name={`name`}
            pattern="[A-Za-z]+"
            required
            onChange={(e) => {
              const value = {
                name: e.target.value,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.name}
            placeholder={lang === "en" ? "Given name" : "Нэр"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            id={`surName`}
            name={`surName`}
            pattern="[A-Za-z]+"
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: e.target.value,
                email: clients.email,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.surName}
            placeholder={lang === "en" ? "Family name" : "Овог"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <input
            type="text"
            id={`email`}
            name={`email`}
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: e.target.value,
                phone: clients.phone,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.email}
            placeholder={lang === "en" ? "Email" : "И-мэйл"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <input
            type="number"
            id={`phone`}
            name={`phone`}
            pattern="[0-9]+"
            required
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: e.target.value,
                nationality: clients.nationality,
              };
              updateClients(value);
            }}
            value={clients.phone}
            placeholder={lang === "en" ? "Phone number" : "Утасны дугаар"}
            className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
          />
          <Select
            isRequired
            aria-label="Nationality"
            placeholder={lang === "en" ? "Nationality" : "Иргэншил"}
            defaultSelectedKeys={[clients.nationality]}
            disableAnimation={true}
            onChange={(e) => {
              const value = {
                name: clients.name,
                surName: clients.surName,
                email: clients.email,
                phone: clients.phone,
                nationality: e.target.value,
              };
              updateClients(value);
            }}
            variant="bordered"
            size="sm"
            classNames={{
              label: "group-data-[filled=true]:-translate-y-5",
              trigger: "min-h-unit-8",
              listboxWrapper: "max-h-[300px]",
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
          >
            {options.map((index) => (
              <SelectItem key={index.label} value={index.label}>
                {index.label}
              </SelectItem>
            ))}
          </Select>
          {additionalClients.length === 0 ? (
            <button
              className="flex items-center justify-end gap-[2px]"
              onClick={() => handleAdditionalClients("add")}
            >
              <div className="relative h-[20px] w-[20px]">
                <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                <div className="absolute left-[50%] top-[50%] h-[10px] w-[2px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
              </div>
              <p className="text-[14px] font-medium leading-[14px] text-primary-blue">
                {lang === "en"
                  ? `Add another client's info`
                  : "Нэмэлт захиалагчийн мэдээлэл оруулах"}
              </p>
            </button>
          ) : null}
        </form>
        {handleAdditionalClients.length > 0
          ? additionalClients.map((index, i) => (
              <form className="flex w-full flex-col gap-[16px]" key={i}>
                <div className="flex justify-between">
                  <p className="font-medium">
                    {lang === "en" ? "Client" : "Захиалагч"} {i + 2}
                  </p>
                  {i + 1 === additionalClients.length ? (
                    <button
                      className="flex items-center justify-end gap-[2px]"
                      onClick={() => handleAdditionalClients("delete")}
                    >
                      <div className="relative h-[20px] w-[20px]">
                        <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                      </div>
                      <p className="text-[14px] font-medium leading-[14px] text-primary-blue">
                        {lang === "en" ? `Delete` : "Хасах"}
                      </p>
                    </button>
                  ) : null}
                </div>
                <input
                  type="text"
                  id={`name${i}`}
                  name={`name${i}`}
                  pattern="[A-Za-z]+"
                  required
                  onChange={(e) => {
                    const value = {
                      name: e.target.value,
                      surName: clients.surName,
                      email: clients.email,
                      phone: clients.phone,
                      nationality: clients.nationality,
                    };
                    updateClients(value);
                  }}
                  // onKeyDown={(e) => {
                  //   const regex = /^[A-Za-z]+$/;
                  //   const isValid = regex.test(e.key);

                  //   if (!isValid) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  placeholder={lang === "en" ? "Given name" : "Нэр"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`surName${i}`}
                  name={`surName${i}`}
                  pattern="[A-Za-z]+"
                  required
                  onChange={(e) => {
                    const value = {
                      name: clients.name,
                      surName: e.target.value,
                      email: clients.email,
                      phone: clients.phone,
                      nationality: clients.nationality,
                    };
                    updateClients(value);
                  }}
                  // onKeyDown={(e) => {
                  //   const regex = /^[A-Za-z]+$/;
                  //   const isValid = regex.test(e.key);

                  //   if (!isValid) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  placeholder={lang === "en" ? "Family name" : "Овог"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`email${i}`}
                  name={`email${i}`}
                  required
                  onChange={(e) => {
                    const value = {
                      name: clients.name,
                      surName: clients.surName,
                      email: e.target.value,
                      phone: clients.phone,
                      nationality: clients.nationality,
                    };
                    updateClients(value);
                  }}
                  placeholder={lang === "en" ? "Email" : "И-мэйл"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`phone${i}`}
                  name={`phone${i}`}
                  pattern="[0-9]+"
                  required
                  // onKeyDown={(e) => {
                  //   // Allow only numeric characters (0-9)
                  //   const isNumericOrBackspace =
                  //     /^[0-9]$/.test(e.key) || e.key === "Backspace";
                  //   if (!isNumericOrBackspace) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  onChange={(e) => {
                    const value = {
                      name: clients.name,
                      surName: clients.surName,
                      email: clients.email,
                      phone: e.target.value,
                      nationality: clients.nationality,
                    };
                    updateClients(value);
                  }}
                  placeholder={lang === "en" ? "Phone number" : "Утасны дугаар"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                <input
                  type="text"
                  id={`nationality${1}`}
                  name={`nationality${1}`}
                  pattern="[A-Za-z]+"
                  required
                  onChange={(e) => {
                    const value = {
                      name: clients.name,
                      surName: clients.surName,
                      email: clients.email,
                      phone: clients.phone,
                      nationality: e.target.value,
                    };
                    updateClients(value);
                  }}
                  placeholder={lang === "en" ? "Nationality" : "Иргэншил"}
                  className="rounded-[8px] border-black/[.15] text-main-text placeholder:text-[14px] placeholder:text-main-text/50 focus:outline-none focus:ring-0"
                />
                {additionalClients.length === i + 1 ? (
                  <button
                    className="flex items-center justify-end gap-[2px]"
                    onClick={() => handleAdditionalClients("add")}
                  >
                    <div className="relative h-[20px] w-[20px]">
                      <div className="absolute left-[50%] top-[50%] h-[2px] w-[10px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                      <div className="absolute left-[50%] top-[50%] h-[10px] w-[2px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-blue"></div>
                    </div>
                    <p className="text-[14px] font-medium leading-[14px] text-primary-blue">
                      {lang === "en"
                        ? `Add another client's info`
                        : "Нэмэлт захиалагчийн мэдээлэл оруулах"}
                    </p>
                  </button>
                ) : null}
              </form>
            ))
          : null}
        <div className="w-full rounded-[8px] border border-primary-blue/50 px-[20px] py-[12px] text-[12px] font-medium leading-[20px] text-primary-blue 2xs:text-[14px]">
          {lang === "en"
            ? "We will contact you shortly after confirming your order request."
            : "Бид захиалах хүсэлт хүлээн авсны дараа таны захиалгыг шалгаад эргээд тантай холбогдох болно."}
        </div>
        {stat === "online" ? (
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col items-center justify-center gap-[24px]">
              <div className="flex items-center justify-center gap-[8px] text-[12px] text-sub-text/75 2xs:text-[14px]">
                <input
                  type="checkBox"
                  name="termCheck"
                  className={`${
                    clients.name === "" &&
                    clients.surName === "" &&
                    clients.email === "" &&
                    clients.phone === "" &&
                    clients.nationality === ""
                      ? " cursor-not-allowed"
                      : "cursor-pointer"
                  } border-black/[.25] focus:ring-0`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  disabled={
                    clients.name === "" &&
                    clients.surName === "" &&
                    clients.email === "" &&
                    clients.phone === "" &&
                    clients.nationality === ""
                  }
                />
                <label htmlFor="termCheck" className="cursor-pointer">
                  {lang === "en" ? (
                    <>
                      Accept{" "}
                      <span className="underline ">
                        <Link href={`${process.env.TEMPORARY_URL}/terms`}>
                          Terms and Conditions
                        </Link>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="underline ">
                        <Link href={`${process.env.TEMPORARY_URL}/terms`}>
                          Үйлчилгээний нөхцөл
                        </Link>
                      </span>{" "}
                      зөвшөөрөх
                    </>
                  )}
                </label>
              </div>
              <button
                className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white ${
                  orderLoading === true ? "sm:text-[12px]" : "sm:text-[18px]"
                } ${
                  orderLoading === true || isChecked === false
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={orderLoading === true || isChecked === false}
              >
                {orderLoading === true
                  ? `${lang === "en" ? "Loading..." : "Уншиж байна..."}`
                  : `${lang === "en" ? "Proceed to payment" : "Төлбөр төлөх"}`}
              </button>
            </div>
          </div>
        ) : (
          <button
            className={`flex w-full max-w-[375px] items-center justify-center rounded-full bg-main-online py-[8px] font-medium text-white sm:text-[18px] ${
              isChecked ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isChecked === false}
          >
            {lang === "en" ? "Send order request" : "Захиалах хүсэлт илгээх"}
          </button>
        )}
      </div>
    );
  }
}
