import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/images/photo-1.avif", "/images/photo-2.avif", "/images/photo-3.avif", "/images/photo-4.avif"];

export const Carousel: React.FC = (props) => {
  const [sliderImagesOrder, setSliderImagesOrder] = useState(images);

  const numberOfSlidesToShow = 4;

  const handleArrowClick = (next: boolean) => {
    setSliderImagesOrder((prev) => {
      const copyState = [...prev];
      if (next) {
        const firstElement = copyState.shift();
        copyState.push(firstElement as string);
      } else {
        const lastElement = copyState.pop();
        copyState.unshift(lastElement as string);
      }
      return copyState;
    });
  };

  const handleSlideClick = (slideIndex: number) => {
    setSliderImagesOrder((prev) => {
      const copyState = [...prev];
      const toBeDisplaced = copyState.splice(0, slideIndex);
      return [...copyState, ...toBeDisplaced];
    });
  };

  const handleRemoveSlide = (slideIndex: number) => {
    setSliderImagesOrder((prev) => {
      const copyState = [...prev];
      return copyState.filter((_, index) => index !== slideIndex);
    });
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        width: "max-content",
        maxWidth: "36rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        color: "black",
        borderRadius: "1rem",
        overflow: "hidden",
        gap: "1rem",
        boxShadow: "0px 4px 20px 10px #747C5F",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={sliderImagesOrder[0]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <Box
              component="img"
              src={sliderImagesOrder[0]}
              alt="Main carousel image"
              sx={{ width: "100%", height: "28rem", objectFit: "cover", borderRadius: "0.8rem" }}
            />
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{ width: "max-content", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box sx={{ cursor: "pointer", display: "flex" }} onClick={() => handleArrowClick(false)}>
          <Box
            component="img"
            src="/image-icons/arrow.png"
            alt="Previous slide"
            sx={{ width: "1.5rem", height: "1.5rem", transform: "rotate(180deg)" }}
          />
        </Box>

        <Box sx={{ flex: 1, width: "max-content", display: "flex", alignItems: "center", gap: "1rem" }}>
          <AnimatePresence key={sliderImagesOrder.slice(0, numberOfSlidesToShow)[0]} mode="popLayout">
            {sliderImagesOrder.slice(0, numberOfSlidesToShow).map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Box sx={{ display: "flex", position: "relative" }}>
                  <IconButton
                    onClick={() => handleRemoveSlide(index)}
                    sx={{
                      margin: "0.4rem",
                      padding: "0.2rem",
                      backgroundColor: "white",
                      position: "absolute",
                      right: "0px",
                    }}
                  >
                    <Box
                      component="img"
                      src="/image-icons/delete.png"
                      alt="Delete slide"
                      sx={{ width: "1rem", height: "1rem" }}
                    />
                  </IconButton>
                  <Box
                    component="img"
                    src={image}
                    alt={`Slide ${index + 1}`}
                    onClick={() => handleSlideClick(index)}
                    sx={{
                      width: "6rem",
                      height: "6rem",
                      objectPosition: "center",
                      objectFit: "cover",
                      borderRadius: "0.6rem",
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <Box sx={{ cursor: "pointer", display: "flex" }} onClick={() => handleArrowClick(true)}>
          <Box
            component="img"
            src="/image-icons/arrow.png"
            alt="Next slide"
            sx={{ width: "1.5rem", height: "1.5rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
