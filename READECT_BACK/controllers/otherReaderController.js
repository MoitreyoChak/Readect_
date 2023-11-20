const Reader = require("../models/readerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getOtherReader = catchAsync(async (req, res) => {
    const otherReader = await Reader.findById(req.params.id)
        .select("-__v -id")
        .populate({
            path: "likedPoems",
            select: "-userId -content -dislikes -likes -firstUploadTime -uploadDate",
        })
        .populate({
            path: "likedShortStories",
            select: "-userId -content -dislikes -likes -firstUploadTime -uploadDate",
        })
        .populate({
            path: "likedArticles",
            select: "-userId -content -dislikes -likes -firstUploadTime -uploadDate",
        })
        .populate({
            path: "likedBooks",
            select: "-userId -content -dislikes -likes -firstUploadTime -uploadDate",
        })
        .populate({
            path: "poems",
            select: "name title tags coverImage uploadDate -userId",
        })
        .populate({
            path: "shortStories",
            select: "name title tags coverImage uploadDate -userId",
        })
        .populate({
            path: "articles",
            select: "name title tags coverImage uploadDate -userId",
        })
        .populate({
            path: "books",
            select: "name title tags coverImage uploadDate -userId",
        });
    res.status(200).json({
        status: "success",
        data: otherReader,
    });
});