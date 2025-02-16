import React, { useEffect } from "react";
import { usePageMetadata } from "../../context/PageMetadataContext";
import SearchBar from "@/components/admin/SearchBar";
import AddTeacherButton from "@/components/admin/AddTeacherButton";
import TeacherRow from "@/components/admin/TeacherRow";
import TeacherList from "@/components/admin/TeacherList";

const TeachersPage = () => {
  const { setMetadata } = usePageMetadata();

  useEffect(() => {
    setMetadata({
      title: "Teachers",
      backPath: null,
    });
  }, [setMetadata]);

  const teachers = [
    {
      id: 1,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/466d0e685b3d001a82e32fb9da1240d9ea0f8301a19e8269ce2a42f81a0c8548?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a811dab5948e12ad1e562e92b7bcd4853502a3c3ffe60a8fa9d569f391890cb6?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 2,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ce03b6896cf348acbcc9b6785f889edc6dc75010f32efdbe787367fa5db518ec?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e2d25c2da4beee715f15aa5777358546b219afec3b97215983754e6806e8172b?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 3,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ae1d98b7ac6ac1842c8e218ec721a57b58f232d81e586d6e145d6ecd85f1266?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/506b46f0f0eb0dc56cb9583639e8fd76a63c2b598648d9c1af646e10baeee209?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 4,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e273194a47d3b72a652dd213a919d8d93472c12f677372812efe7ebe72b97ac4?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a67197534651bd9d9891485fe52b0a5768cd2e6c0ffb030ad160d87229f69869?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 5,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/afbc2ceae00d10caec435530069345ef70c9021913a499e6336457a166ac545b?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4155a33e53dd42ac1a90782f997681f70a316ba50b80741ba530bc7005f80376?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 6,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3613e42f712296b60787549899fcde03997b17d5d07ca526e936a6298fe00de9?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/53fca82bf51f71823241f844a290a7fa12e6bace04fb6c718757892efe4d9495?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 7,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/41479704f485c9e3187b2d20234f6803a09cf9e6caf55fdd8e4f676c7de8a421?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/59c5b4a76c2d9c2003dd31b6523802abe2c5f09e102e990de974bae5862895ad?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      id: 8,
      name: "Teacher A",
      email: "example@email.com",
      phone: "0000000000",
      subject: "Maths",
      joinDate: "14 Apr 2015",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/430a5a3accfba3d965fb4a46d5b08dc704d9eadca950607847af4caf07c68842?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      menuIcon:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/89bd994a3b311d9e19fe319f4655edad3423d894b412ffaf7e297a793e20d071?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
        <SearchBar />
        <AddTeacherButton />
      </div>
      <TeacherList />
      <div>
        {teachers.map((teacher, index) => (
          <TeacherRow key={index} {...teacher} />
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
