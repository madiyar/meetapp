-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 22 2020 г., 18:17
-- Версия сервера: 5.7.23
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `meetapp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `capacity`) VALUES
(1, 'P2P', 3),
(2, 'Small', 15),
(3, 'Big', 50);

-- --------------------------------------------------------

--
-- Структура таблицы `meetings`
--

CREATE TABLE `meetings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `creatorId` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `freeEntry` tinyint(4) NOT NULL DEFAULT '0',
  `isCanceled` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `meetings`
--

INSERT INTO `meetings` (`id`, `title`, `description`, `creatorId`, `roomId`, `startDate`, `endDate`, `freeEntry`, `isCanceled`) VALUES
(1, 'Teambuilding', 'Blah blah blah', 1, 2, '2020-02-22 21:11:32', '2020-02-22 21:11:32', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `participans`
--

CREATE TABLE `participans` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `meetingId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `description`, `photo`, `location`, `categoryId`) VALUES
(1, 'Yellow room', 'hello meow', '4cdceff9-ee9f-4681-ae70-844363a3dcbf.jpg', '', 3),
(2, 'Another room', 'test', '29900ed8-977d-470c-a597-996dc3aa5081.jpg', '', 3),
(3, 'TEST room', 'ssst', '46e15a6f-cab8-44c2-ac42-9ab7dae6aac3.jpg', '', 2),
(4, 'kek', 'bruh', 'cee0ac03-e699-4ebc-ad02-4832ef22b995.jpg', '', 1),
(5, 'Room wroom', 'gde', '', '', 3),
(6, 'Test', 'Tets', '', '', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstName`, `lastName`, `phone`, `email`, `isAdmin`) VALUES
(1, 'admin', '12345', 'Admin', 'Admin', '88005553535', 'admin@mail.ru', 1),
(2, 'madi', '12345', 'Madi', 'Bolat', '123456', 'mad@mmad.ru', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_35f8f8d281852441192c6992d56` (`roomId`),
  ADD KEY `FK_6b477f8303be5b5c8b65968d5f3` (`creatorId`);

--
-- Индексы таблицы `participans`
--
ALTER TABLE `participans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bcd1d067f2eb4101d346056db37` (`userId`),
  ADD KEY `FK_0dfe0cd081eff038f161a459063` (`meetingId`);

--
-- Индексы таблицы `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_a0b9bb9cdf9eda2d7800c7b0ad8` (`categoryId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `participans`
--
ALTER TABLE `participans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `FK_35f8f8d281852441192c6992d56` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6b477f8303be5b5c8b65968d5f3` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `participans`
--
ALTER TABLE `participans`
  ADD CONSTRAINT `FK_0dfe0cd081eff038f161a459063` FOREIGN KEY (`meetingId`) REFERENCES `meetings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bcd1d067f2eb4101d346056db37` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `FK_a0b9bb9cdf9eda2d7800c7b0ad8` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
