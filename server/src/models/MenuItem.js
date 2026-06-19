'use strict';

var mongoose = require('mongoose');

var MenuItemSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  slug:          { type: String, lowercase: true },
  category:      { type: String, required: true, lowercase: true,
    enum: ['starters', 'mains', 'specials', 'desserts', 'drinks', 'brunch', 'salads', 'soups'] },
  price:         { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: null },
  description:   { type: String, required: true },
  image:         { type: String, required: true },
  imagePublicId: { type: String, default: null },
  badge:         { type: String, default: null },
  rating:        { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount:   { type: Number, default: 0 },
  isVeg:         { type: Boolean, default: false },
  isPopular:     { type: Boolean, default: false },
  isFeatured:    { type: Boolean, default: false },
  isAvailable:   { type: Boolean, default: true },
  tags:          [{ type: String }],
  prepTime:      { type: Number, default: 20 },
  calories:      { type: Number, default: null },
  sortOrder:     { type: Number, default: 0 },
}, { timestamps: true });

MenuItemSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// Text search index only (no duplicate unique indexes)
MenuItemSchema.index({ name: 'text', description: 'text' });
MenuItemSchema.index({ category: 1, isAvailable: 1 });
MenuItemSchema.index({ isPopular: 1 });
MenuItemSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
