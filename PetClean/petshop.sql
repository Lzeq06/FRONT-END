-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01/04/2026 às 00:59
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `petshop`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `id_pet` int(11) DEFAULT NULL,
  `id_servico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamentos`
--

INSERT INTO `agendamentos` (`id`, `data`, `hora`, `id_pet`, `id_servico`) VALUES
(4, '2026-04-07', '09:00:00', 1, 5),
(5, '2026-04-07', '16:00:00', 2, 6),
(6, '2026-04-02', '13:00:00', 3, 7),
(7, '2026-04-05', '12:00:00', 4, 7),
(8, '2026-04-03', '16:00:00', 5, 5),
(9, '2026-04-07', '09:00:00', 6, 7),
(10, '2026-04-01', '08:00:00', 7, 4),
(11, '2026-04-09', '08:00:00', 8, 2),
(12, '2026-04-04', '16:00:00', 9, 6),
(13, '2026-04-09', '13:00:00', 10, 2),
(14, '2026-04-05', '16:00:00', 11, 5),
(15, '2026-04-03', '09:00:00', 12, 11),
(16, '2026-04-08', '14:00:00', 13, 10),
(17, '2026-04-06', '15:00:00', 14, 10),
(18, '2026-04-04', '12:00:00', 15, 5),
(19, '2026-04-02', '15:00:00', 16, 9),
(20, '2026-04-06', '11:00:00', 17, 8),
(21, '2026-04-01', '09:00:00', 18, 7),
(22, '2026-04-09', '08:00:00', 19, 4),
(23, '2026-04-07', '17:00:00', 20, 12),
(24, '2026-04-06', '17:00:00', 21, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `telefone`, `email`) VALUES
(1, 'Maria Souza', '11984569360', 'maria@gmail.com'),
(3, 'Ana Silva', '(11) 90000-0001', 'ana1@email.com'),
(4, 'Bruno Costa', '(11) 90000-0002', 'bruno2@email.com'),
(5, 'Carla Souza', '(11) 90000-0003', 'carla3@email.com'),
(6, 'Daniel Lima', '(11) 90000-0004', 'daniel4@email.com'),
(7, 'Eduarda Alves', '(11) 90000-0005', 'eduarda5@email.com'),
(8, 'Felipe Rocha', '(11) 90000-0006', 'felipe6@email.com'),
(9, 'Gabriela Martins', '(11) 90000-0007', 'gabi7@email.com'),
(10, 'Henrique Gomes', '(11) 90000-0008', 'henrique8@email.com'),
(11, 'Isabela Melo', '(11) 90000-0009', 'isa9@email.com'),
(12, 'João Pedro', '(11) 90000-0010', 'joao10@email.com'),
(13, 'Karen Ribeiro', '(11) 90000-0011', 'karen11@email.com'),
(14, 'Lucas Teixeira', '(11) 90000-0012', 'lucas12@email.com'),
(15, 'Mariana Duarte', '(11) 90000-0013', 'mariana13@email.com'),
(16, 'Nicolas Barros', '(11) 90000-0014', 'nico14@email.com'),
(17, 'Olivia Freitas', '(11) 90000-0015', 'olivia15@email.com'),
(18, 'Paulo Henrique', '(11) 90000-0016', 'paulo16@email.com'),
(19, 'Renata Lopes', '(11) 90000-0017', 'renata17@email.com'),
(20, 'Samuel Pinto', '(11) 90000-0018', 'samuel18@email.com'),
(21, 'Tatiane Cruz', '(11) 90000-0019', 'tati19@email.com'),
(22, 'Victor Santos', '(11) 90000-0020', 'victor20@email.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `raca` varchar(100) DEFAULT NULL,
  `idade` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pets`
--

INSERT INTO `pets` (`id`, `nome`, `raca`, `idade`, `id_cliente`) VALUES
(1, 'Alfred', 'Hamster Sirio', 2, 1),
(2, 'Luna', 'Bulldog', 9, 1),
(3, 'Luna', 'Vira-lata', 7, 3),
(4, 'Pipoca', 'Vira-lata', 7, 4),
(5, 'Bolinha', 'Poodle', 8, 5),
(6, 'Thor', 'Pastor', 12, 6),
(7, 'Pipoca', 'Pastor', 5, 7),
(8, 'Alfred', 'Golden', 4, 8),
(9, 'Nina', 'Pastor', 9, 9),
(10, 'Alfred', 'Vira-lata', 11, 10),
(11, 'Rex', 'Golden', 6, 11),
(12, 'Bolinha', 'Poodle', 4, 12),
(13, 'Luna', 'Poodle', 13, 13),
(14, 'Nina', 'Vira-lata', 12, 14),
(15, 'Zeus', 'Pastor', 10, 15),
(16, 'Alfred', 'Golden', 9, 16),
(17, 'Zeus', 'Vira-lata', 7, 17),
(18, 'Thor', 'Pastor', 9, 18),
(19, 'Simba', 'Vira-lata', 5, 19),
(20, 'Luna', 'Vira-lata', 1, 20),
(21, 'Alfred', 'Bulldog', 6, 21);

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`id`, `nome`, `preco`) VALUES
(2, 'Banho e Tosa', 50.99),
(4, 'Cortar unhas ', 100.00),
(5, 'Banho', 40.00),
(6, 'Tosa', 50.00),
(7, 'Banho + Tosa', 80.00),
(8, 'Corte de Unha', 20.00),
(9, 'Hidratação', 60.00),
(10, 'Escovação', 25.00),
(11, 'Limpeza de Ouvido', 30.00),
(12, 'Consulta Veterinária', 120.00);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pet` (`id_pet`),
  ADD KEY `id_servico` (`id_servico`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`id_pet`) REFERENCES `pets` (`id`),
  ADD CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`id_servico`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
