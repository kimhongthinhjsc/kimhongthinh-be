import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  img: String,
  number: Number,
  suffix: String,
  text: String,
});

const homeSchema = new mongoose.Schema({
  hero: {
    background: String,
    title: String,
    subtitle: String,
    stats: [statSchema],
    sloganTitle: String,
    sloganDesc: String,
    link: String,
  },
  ecosystem: Object,
  testimonial: Object,
  culture: Object,
  partners: Object,
  news: Object,
  contact: Object,
});

export default mongoose.model("Home", homeSchema);
