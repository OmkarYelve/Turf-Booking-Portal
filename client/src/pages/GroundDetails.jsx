import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/helper";
import { useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

const GroundDetails = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [ground, setGround] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getGroundDetails = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/user/ground/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setGround(data?.ground);
        setInputs({
          name: data?.ground.ground_name,
          location: data?.ground.location,
          description: data?.ground.description,
          price: data?.ground.price,
          images: data?.ground.images,
          availableSlots: data?.ground.availableSlots,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroundDetails();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const isCurrentDate =
    selectedDate.toISOString().split("T")[0] ===
    new Date().toISOString().split("T")[0];

  // Razorpay payment flow
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTimeSlot) {
      toast.error("Select date and time");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create order on backend
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/payment/create-order`,
        {
          amount: inputs.price,
          turfId: id,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!data.success) {
        toast.error(data.message || "Failed to create order");
        setIsProcessing(false);
        return;
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "TurfsCorner",
        description: `Booking for ${inputs.name}`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verify = await axios.post(
              `${BASE_URL}/api/v1/user/payment/verify`,
              {
                ...response,
                turfId: id,
                date: selectedDate,
                timeSlot: selectedTimeSlot,
                userId,
                amount: inputs.price,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              },
            );

            if (verify.data.success) {
              toast.success("Booking confirmed! 🎉");
              navigate("/bookings");
            } else {
              toast.error(verify.data.message || "Booking failed");
            }
          } catch (error) {
            const msg =
              error.response?.data?.message || "Payment verification failed";
            toast.error(msg);
          }
        },
        prefill: {
          email: localStorage.getItem("email") || "",
        },
        theme: { color: "#111827" },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error('This slot is already booked');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4 lg:pt-5">
      <h2 className="text-2xl lg:text-4xl lg:mt-4 lg:ml-4 font-bold mb-4">
        {inputs.name}
      </h2>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:p-4 mt-8 lg:mt-4">
          <div className="bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md">
            <h1 className="text-xl font-semibold mb-2">Location</h1>
            <p className="text-lg mb-2">{inputs.location}</p>
          </div>
          <div className="bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md">
            <h1 className="text-xl font-semibold mb-2">About {inputs.name}</h1>
            <p className="text-gray-700">{inputs.description}</p>
          </div>
          <div className="bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center shadow-md">
            <h1 className="text-xl font-semibold mb-2">Amenities</h1>
            <p className="text-gray-700">Parking, Washroom</p>
          </div>
        </div>
        <div className="lg:w-1/2 lg:p-4 mt-8 lg:mt-4">
          <div className="flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-lg justify-center mb-4 shadow-md">
            <h1 className="text-xl font-semibold mb-3">Images</h1>
            <div className="flex flex-row overflow-scroll">
              {inputs.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    onClick={() => openImageViewer(index)}
                    className="cursor-pointer"
                    alt={`Image ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      height: "150px",
                      margin: "2px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={handlePayment}
            className="bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Date:</label>
              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={handleDateChange}
                className="rounded p-2 border border-gray-300 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Select Time Slot:
              </label>
              <select
                name="timeSlot"
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                className="w-full border border-gray-300 rounded p-2"
                disabled={isCurrentDate}
              >
                <option value="">Select a Time Slot</option>
                {inputs.availableSlots?.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {isCurrentDate && (
                <span className="text-red-500 ml-3">
                  No slots available for selected date
                </span>
              )}
            </div>
            {isLogin && (
              <>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-gray-900 text-white lg:w-40 px-4 py-2 rounded-lg mb-2 disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${inputs.price}`}
                </button>
                <span className="font-semibold">@ ₹{inputs.price}/hour</span>
              </>
            )}
            {!isLogin && (
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-900 text-white lg:w-32 px-4 py-2 rounded-lg"
              >
                Login to book
              </button>
            )}
          </form>
        </div>
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={inputs.images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default GroundDetails;
