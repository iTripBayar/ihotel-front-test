import { useSearchParams } from "next/navigation";
import { useMemo, useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import countryList from "react-select-country-list";
import { changeProfileInfo } from "@/utils/user";
import { useRequest } from "ahooks";
import { CircularProgress } from "@chakra-ui/react";
import { toast } from "sonner";


interface Props {
  action: string;
  handleAction: (e: string) => void;
  userData: User.User | undefined;
}

export default function EdtiSection({ action, handleAction, userData }: Props) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [userInfo, setUserInfo] = useState({
    surname: userData?.surname ? userData.surname : "",
    name: userData?.name ? userData.name : "",
    image: userData?.avatar ? userData.avatar : "",
    sex: userData?.gender ? userData.gender : "",
    nationality: userData?.country ? userData.country : "",
    phone: userData?.phoneNumber ? userData.phoneNumber : "",
    email: userData?.email ? userData.email : "",
  });
  const options = useMemo(() => countryList().getData(), []);
  const [pass, setPass] = useState({ password: "", confirm: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [arePasswordsValid, setArePasswordsValid] = useState("");

  const {
    run,
    loading,
  } = useRequest(
    (e: {
      id: string;
      name: string;
      surname: string;
      gender: string;
      phone_number: string;
      country: string;
      password: string;
    }) => {
      return changeProfileInfo(e);
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
        handleAction("saved");
        toast.success(`${lang === "en" ? "Changes applied!" : "Таны мэдээлэл өөрчлөгдлөө!"}`);
      },
    },
  );

  const handlePassWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPass({ password: value, confirm: pass.confirm });
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%^&*()]).{8,}$/;
    setArePasswordsValid(regex.test(value) === true ? "patternOk" : "");
  };

  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setPass({ password: pass.password, confirm: value });
    setArePasswordsValid(pass.password === value ? "match" : "nomatch");
  };

  const sexOptions = [
    { label: "Male", labelMN: "Эрэгтэй", value: "male" },
    { label: "Female", labelMN: "Эмэгтэй", value: "Female" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = new FormData(e.currentTarget);
    const value = {
      id: userData?.id ? userData?.id.toString() : "",
      name: userInfo.name !== userData?.name ? userInfo.name : "",
      surname: userInfo.surname !== userData?.surname ? userInfo.surname : "",
      gender: userInfo.sex !== userData?.gender ? userInfo.sex : "",
      phone_number:
        userInfo.phone !== userData?.phoneNumber ? userInfo.phone : "",
      country:
        userInfo.nationality !== userData?.country ? userInfo.nationality : "",
      password: "",
    };
    run(value);
  };
  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = new FormData(e.currentTarget);
    if (arePasswordsValid === 'match') {
      const value = {
      id: userData?.id ? userData?.id.toString() : "",
        name: "",
        surname: "",
        gender: "",
        phone_number: "",
        country: "",
        password: pass.confirm,
      };
      run(value);
    }
  };

  return (
    <div className="flex flex-col rounded-[20px] items-center gap-[16px] shadow-[0px_0px_12px_4px_rgb(0,0,0,0.15)] px-[12px] 2xs:px-[16px] sm:px-[20px] md:px-[50px] lg:px-[100px] xl:px-[125px] py-[16px] 2xs:py-[18px] sm:py-[20px] md:py-[24px] lg:py-[32px] xl:py-[48px]  w-full">
      {/* back btn */}
      <button
        className="flex gap-[6px] text-primary-blue justify-center items-center font-medium"
        onClick={() => handleAction("")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        <span>{lang === "en" ? "Back" : "Буцах"}</span>
      </button>
      {action === "info" ? (
        <form
          className="flex flex-col gap-[20px] w-full items-start"
          onSubmit={handleSubmit}
        >
          {/* title */}
          <div className="text-[16px] leading-[16px] text-sub-text/75 font-medium pb-[12px] pt-[8px] border-b border-b-black/[.15] w-full ">
            {action === "info" ? (
              <p>{lang === "en" ? "Edit profile" : "Хувийн бүртгэл"}</p>
            ) : (
              <p>{lang === "en" ? "Change password" : "Нууц үг солих"}</p>
            )}
          </div>
          {/* inputs */}
          <div className="flex flex-col gap-[24px] w-full ">
            {/* names */}
            <div className="flex flex-col gap-[24px] w-full md:grid md:grid-cols-2">
              {/* surname */}
              <div className="w-full flex flex-col gap-[6px] max-w-[450px] lg:max-w-none">
                <label
                  htmlFor="surname"
                  className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                >
                  {lang === "en" ? "Surname" : "Таны овог"}
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  onKeyDown={(e) => {
                    const regex = /^[A-Za-z]+$/;
                    const isValid = regex.test(e.key);

                    if (!isValid) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const value = {
                      surname: e.target.value,
                      name: userInfo.name,
                      image: userInfo.image,
                      sex: userInfo.sex,
                      nationality: userInfo.nationality,
                      phone: userInfo.phone,
                      email: userInfo.email,
                    };
                    setUserInfo(value);
                  }}
                  value={userInfo.surname}
                  placeholder={lang === "en" ? "Name" : "Таны овог"}
                  className=" placeholder:text-[14px] placeholder:text-sub-text/50 w-full rounded-[12px] border border-sub-text/[.35] h-[48px] px-[10px]"
                />
              </div>
              {/* name */}
              <div className="w-full flex flex-col gap-[6px] max-w-[450px] lg:max-w-none">
                <label
                  htmlFor="name"
                  className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                >
                  {lang === "en" ? "Name" : "Таны нэр"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onKeyDown={(e) => {
                    const regex = /^[A-Za-z]+$/;
                    const isValid = regex.test(e.key);

                    if (!isValid) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const value = {
                      surname: userInfo.surname,
                      name: e.target.value,
                      image: userInfo.image,
                      sex: userInfo.sex,
                      nationality: userInfo.nationality,
                      phone: userInfo.phone,
                      email: userInfo.email,
                    };
                    setUserInfo(value);
                  }}
                  value={userInfo.name}
                  placeholder={lang === "en" ? "Name" : "Таны нэр"}
                  className=" placeholder:text-[14px] placeholder:text-sub-text/50 w-full rounded-[12px] border border-sub-text/[.35] h-[48px] px-[10px] "
                />
              </div>
            </div>
            {/* rest */}
            <div className="flex flex-col gap-[24px] w-full lg:grid lg:grid-cols-2">
              {/* image */}
              <div className="w-full flex flex-col gap-[6px] max-w-[450px] md:max-w-none">
                <label
                  htmlFor="image"
                  className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                >
                  {lang === "en" ? "Profile image" : "Таны зураг"}
                </label>
                <div className="px-[16px] py-[16px] border border-sub-text/[.35] rounded-[12px] w-full flex flex-col gap-[20px] items-start ">
                  {/* image insert */}
                  <button
                    onClick={() => {
                      document.getElementById("imageInput")?.click();
                    }}
                    className="border-[2px] border-dashed hover:bg-sub-text/[.075] hover:border-primary-blue/50 border-sub-text/[.25] w-[120px] h-[120px] lg:w-[135px] lg:h-[135px] rounded-[8px] flex justify-center items-center text-primary-blue"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </button>
                  <div className="relative w-[120px] h-[120px] lg:w-[135px] lg:h-[135px] rounded-[8px] overflow-hidden">
                    <Image
                      src={
                        userData?.avatar
                          ? `${process.env.WEB_URL}/${userData.avatar}`
                          : "/samples/profileSample.jpg"
                      }
                      alt="/profileImg"
                      fill={true}
                      sizes="60vw"
                      className={`h-auto w-auto select-none object-cover`}
                      draggable={false}
                    />
                  </div>
                </div>
                <input
                  type="file"
                  id="imageInput"
                  name="imageInput"
                  onChange={(e) => console.log(e.target.value)}
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                />
                {/* onChange=
                {(e) => {
                  const value = {
                    surname: userInfo.surname,
                    name: e.target.value,
                    image: userInfo.image,
                    sex: userInfo.sex,
                    nationality: userInfo.nationality,
                    phone: userInfo.phone,
                    email: userInfo.email,
                  };
                  setUserInfo(value);
                }} */}
              </div>
              {/* other inputs */}
              <div className="flex flex-col gap-[24px] w-full">
                {/* sex & nationality */}
                <div className="flex flex-col gap-[24px] w-full md:grid md:grid-cols-2 lg:flex">
                  {/* sex */}
                  <div className="w-full flex flex-col gap-[6px] max-w-[450px] lg:max-w-none">
                    <label
                      htmlFor="sex"
                      className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                    >
                      {lang === "en" ? "Sex" : "Хүйс"}
                    </label>
                    <Select
                      aria-label="Sex"
                      name="sex"
                      placeholder={lang === "en" ? "Sex" : "Хүйс"}
                      // defaultSelectedKeys={["Mongolia"]}
                      onChange={(e) => {
                        const value = {
                          surname: userInfo.surname,
                          name: userInfo.name,
                          image: userInfo.image,
                          sex: e.target.value,
                          nationality: userInfo.nationality,
                          phone: userInfo.phone,
                          email: userInfo.email,
                        };
                        setUserInfo(value);
                      }}
                      variant="bordered"
                      size="sm"
                      classNames={{
                        label: "group-data-[filled=true]:-translate-y-5 ",
                        trigger:
                          "border-sub-text/[.35] border-[1px] rounded-[12px]",
                        listboxWrapper: "max-h-[300px] ",
                      }}
                      popoverProps={{
                        classNames: {
                          base: "before:bg-default-200",
                          content:
                            "p-0 border-small border-divider bg-background",
                        },
                      }}
                    >
                      {sexOptions.map((index) => (
                        <SelectItem key={index.label} value={index.label}>
                          {lang === "en" ? index.label : index.labelMN}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  {/* nationality */}
                  <div className="w-full flex flex-col gap-[6px] max-w-[450px] lg:max-w-none">
                    <label
                      htmlFor="sex"
                      className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                    >
                      {lang === "en" ? "Nationality" : "Иргэншил"}
                    </label>
                    <Select
                      isRequired
                      aria-label="Nationality"
                      name="nationality"
                      placeholder={lang === "en" ? "Nationality" : "Иргэншил"}
                      defaultSelectedKeys={["Mongolia"]}
                      onChange={(e) => {
                        const value = {
                          surname: userInfo.surname,
                          name: userInfo.name,
                          image: userInfo.image,
                          sex: userInfo.sex,
                          nationality: e.target.value,
                          phone: userInfo.phone,
                          email: userInfo.email,
                        };
                        setUserInfo(value);
                      }}
                      variant="bordered"
                      size="sm"
                      classNames={{
                        label: "group-data-[filled=true]:-translate-y-5 ",
                        trigger:
                          "border-sub-text/[.35] border-[1px] rounded-[12px]",
                        listboxWrapper: "max-h-[300px] ",
                      }}
                      popoverProps={{
                        classNames: {
                          base: "before:bg-default-200",
                          content:
                            "p-0 border-small border-divider bg-background",
                        },
                      }}
                    >
                      {options.map((index) => (
                        <SelectItem key={index.label} value={index.label}>
                          {index.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* phone & email */}
                <div className="flex flex-col gap-[24px] w-full md:grid md:grid-cols-2 lg:flex">
                  {/* phone */}
                  <div className="w-full flex flex-col gap-[6px] max-w-[450px] lg:max-w-none">
                    <label
                      htmlFor="phone"
                      className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                    >
                      {lang === "en" ? "Phone number" : "Таны утасны дугаар"}
                    </label>
                    <input
                      type="number"
                      id="name"
                      name="name"
                      pattern="[0-9]+"
                      onChange={(e) => {
                        const value = {
                          surname: userInfo.surname,
                          name: userInfo.name,
                          image: userInfo.image,
                          sex: userInfo.sex,
                          nationality: userInfo.nationality,
                          phone: e.target.value,
                          email: userInfo.email,
                        };
                        setUserInfo(value);
                      }}
                      value={userInfo.phone}
                      placeholder={
                        lang === "en" ? "Phone number" : "Таны утасны дугаар"
                      }
                      className=" placeholder:text-[14px] placeholder:text-sub-text/50 w-full rounded-[12px] border border-sub-text/[.35] h-[48px] px-[10px]"
                    />
                  </div>
                  {/* email */}
                  <div className="w-full flex flex-col gap-[6px] max-w-[450px] lg:max-w-none">
                    <label
                      htmlFor="email"
                      className="text-sub-text/75 text-[14px] leading-[14px] pl-[8px]"
                    >
                      {lang === "en" ? "Email" : "И-мэйл хаяг"}
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      required
                      onChange={(e) => {
                        const value = {
                          surname: userInfo.surname,
                          name: userInfo.name,
                          image: userInfo.image,
                          sex: userInfo.sex,
                          nationality: userInfo.nationality,
                          phone: userInfo.phone,
                          email: e.target.value,
                        };
                        setUserInfo(value);
                      }}
                      value={userInfo.email}
                      placeholder={lang === "en" ? "Email" : "И-мэйл хаяг"}
                      className=" placeholder:text-[14px] placeholder:text-sub-text/50 w-full rounded-[12px] border border-sub-text/[.35] h-[48px] px-[10px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex px-[16px] py-[12px] min-w-[112px] rounded-full text-white bg-primary-blue text-[14px] leading-[14px] uppercase justify-center items-center m-auto font-semibold"
            >
              {loading === true ? (
                <CircularProgress
                  isIndeterminate={true}
                  color="#3C76FE"
                  size="14px"
                />
              ) : (
                <p>{lang === "en" ? "save" : "хадгалах"}</p>
              )}
            </button>
          </div>
        </form>
      ) : (
        <form
          className="flex flex-col gap-[20px] w-full items-start"
          onSubmit={handlePasswordUpdate}
        >
          {/* title */}
          <div className="text-[16px] leading-[16px] text-sub-text/75 font-medium pb-[12px] pt-[8px] border-b border-b-black/[.15] w-full ">
            {action === "info" ? (
              <p>{lang === "en" ? "Edit profile" : "Хувийн бүртгэл"}</p>
            ) : (
              <p>{lang === "en" ? "Change password" : "Нууц үг солих"}</p>
            )}
          </div>
          {/* inputs */}
          <div className="flex flex-col gap-[24px] w-full md:grid md:grid-cols-2">
            {/* password */}
            <div className="relative">
              <input
                type={passwordVisible !== true ? "password" : "text"}
                id="password"
                name="password"
                minLength={8}
                required
                value={pass.password}
                onChange={handlePassWordChange}
                placeholder={lang === "en" ? "Password" : "Нууц үг"}
                className=" placeholder:text-[14px] placeholder:text-sub-text/50 w-full rounded-[12px] border border-sub-text/[.35] h-[48px] px-[10px]"
              />
              <button
                type="button"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
                className="absolute right-0 top-[50%] h-[34px] cursor-pointer px-2 translate-y-[-50%]"
              >
                {passwordVisible === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    stroke="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    stroke="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* confirm */}
            <div className="relative">
              <input
                type={passwordVisible1 !== true ? "password" : "text"}
                id="passwordConfirm"
                name="passwordConfirm"
                minLength={8}
                required
                value={pass.confirm}
                onChange={handlePasswordConfirmChange}
                placeholder={
                  lang === "en"
                    ? "Confirm password"
                    : "Нууц үг дахин оруулна уу"
                }
                className=" placeholder:text-[14px] placeholder:text-sub-text/50 w-full rounded-[12px] border border-sub-text/[.35] h-[48px] px-[10px]"
              />
              <button
                type="button"
                onClick={() => {
                  setPasswordVisible1(!passwordVisible1);
                }}
                className="absolute right-0 top-[50%] h-[34px] cursor-pointer px-2 translate-y-[-50%]"
              >
                {passwordVisible === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    stroke="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    stroke="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="md:col-span-2 text-center">
              {arePasswordsValid === "" ? (
                <p className="mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]">
                  {lang === "en"
                    ? "* Password must have an uppercase letter, a number, a symbol, and be at least 8 characters long *"
                    : "* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *"}
                </p>
              ) : arePasswordsValid === "nomatch" ? (
                <p className="mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]">
                  {lang === "en"
                    ? "* Passwords does not match *"
                    : "* Нууц үгнүүд хоорондоо таарахгүй байна *"}
                </p>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            disabled={arePasswordsValid !== "match"}
            className={`flex px-[16px] py-[12px] rounded-full text-white bg-primary-blue text-[14px] leading-[14px] uppercase justify-center items-center m-auto font-semibold ${
              arePasswordsValid !== "match" ? "opacity-50" : ""
            }`}
          >
            {loading === true ? (
              <CircularProgress
                isIndeterminate={true}
                color="#3C76FE"
                size="14px"
              />
            ) : (
              <p>{lang === "en" ? "save" : "хадгалах"}</p>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
