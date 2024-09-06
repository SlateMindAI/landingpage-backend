const WaitingList = require('../models/waitingList');
//comment


const sendEmail = require('../utils/sendEmail');

exports.addToWaitingList = async (req, res) => {
  const { email, name } = req.body;

  if(!email || !name){
    return res.status(400).json({ success: false, error: 'Please provide both name and email' });
  }

  try {
    const newUser = await WaitingList.create({ email, name });

    // Send thank you email
    await sendEmail({
      to: email,
      subject: 'Thank You for Joining the SlateMindAI Waiting List!',
      text: `Dear ${name},\n\nThank you for joining the SlateMindAI waiting list! We're excited to have you on board! Here's how you can stay connected and updated with us:\n\n- Join our Discord: https://discord.gg/HX5fmKSd\n- Join our Reddit: https://www.reddit.com/r/MindSlateAI/\n- Connect with us on LinkedIn: https://www.linkedin.com/company/slatemind-ai/?viewAsMember=true\n\nWe will notify you as soon as we launch.\n\nBest regards,\nThe SlateMindAI Team`,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
